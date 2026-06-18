import http from 'node:http';
import { randomUUID } from 'node:crypto';

const PORT = Number(process.env.API_PORT ?? 3001);
const API_KEY = process.env.DELICIAS_API_KEY ?? 'demo-key';
const solicitudes = new Map();

const productos = [
  { id: 'lasana-casera', nombre: 'Lasana casera', categoria: 'Pasta', etiqueta: 'Familiar', precio: '7,95 EUR' },
  { id: 'ensalada-mediterranea', nombre: 'Ensalada mediterranea', categoria: 'Ensaladas', etiqueta: 'Saludable', precio: '5,95 EUR' },
  { id: 'pollo-curry', nombre: 'Pollo al curry', categoria: 'Carnes', etiqueta: 'Especiado', precio: '8,50 EUR' },
  { id: 'bowl-vegetal', nombre: 'Bowl vegetal', categoria: 'Vegetal', etiqueta: 'Saludable', precio: '7,25 EUR' },
  { id: 'pasta-carbonara', nombre: 'Pasta carbonara', categoria: 'Pasta', etiqueta: 'Cremoso', precio: '7,50 EUR' }
];

function commonHeaders(extra = {}) {
  return {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,DELETE,HEAD,OPTIONS',
    'access-control-allow-headers': 'content-type,x-api-key,authorization',
    'cache-control': 'no-store',
    ...extra
  };
}

function json(res, status, body, headers = {}) {
  res.writeHead(status, commonHeaders(headers));
  res.end(body === undefined ? undefined : JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

function filtrarProductos(url) {
  const q = (url.searchParams.get('q') ?? '').toLowerCase();
  const categoria = (url.searchParams.get('categoria') ?? '').toLowerCase();
  const etiqueta = (url.searchParams.get('etiqueta') ?? '').toLowerCase();

  return productos.filter((producto) => {
    const texto = `${producto.nombre} ${producto.categoria} ${producto.etiqueta}`.toLowerCase();
    return (!q || texto.includes(q))
      && (!categoria || producto.categoria.toLowerCase() === categoria)
      && (!etiqueta || producto.etiqueta.toLowerCase() === etiqueta);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, commonHeaders({ allow: 'GET,POST,DELETE,HEAD,OPTIONS' }));
    res.end();
    return;
  }

  if (url.pathname === '/api/health' && req.method === 'GET') {
    json(res, 200, { status: 'ok', service: 'delicias-api' });
    return;
  }

  if (url.pathname === '/api/productos' && req.method === 'HEAD') {
    res.writeHead(200, commonHeaders({ allow: 'GET,HEAD,OPTIONS' }));
    res.end();
    return;
  }

  if (url.pathname === '/api/productos' && req.method === 'GET') {
    if (url.searchParams.get('fail') === 'true') {
      json(res, 500, { message: 'Internal Server Error' });
      return;
    }
    const data = filtrarProductos(url);
    json(res, 200, { total: data.length, data });
    return;
  }

  const productoMatch = url.pathname.match(/^\/api\/productos\/([^/]+)$/);
  if (productoMatch && req.method === 'GET') {
    const producto = productos.find((item) => item.id === productoMatch[1]);
    json(res, producto ? 200 : 404, producto ?? { message: 'Producto no encontrado' });
    return;
  }

  if (url.pathname === '/api/solicitudes' && req.method === 'POST') {
    const data = await readBody(req);
    const id = randomUUID();
    const solicitud = { id, ...data, creadaEn: new Date().toISOString() };
    solicitudes.set(id, solicitud);
    json(res, 201, solicitud, { location: `/api/solicitudes/${id}` });
    return;
  }

  const solicitudMatch = url.pathname.match(/^\/api\/solicitudes\/([^/]+)$/);
  if (solicitudMatch && req.method === 'DELETE') {
    solicitudes.delete(solicitudMatch[1]);
    json(res, 204);
    return;
  }

  if (url.pathname === '/api/admin/resumen' && req.method === 'GET') {
    if (req.headers['x-api-key'] !== API_KEY) {
      json(res, 401, { message: 'Unauthorized' });
      return;
    }
    json(res, 200, { productos: productos.length, solicitudes: solicitudes.size });
    return;
  }

  json(res, 404, { message: 'Not found' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Delicias API escuchando en http://127.0.0.1:${PORT}`);
});
