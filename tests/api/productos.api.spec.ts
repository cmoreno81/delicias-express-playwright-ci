import { test, expect } from '../fixtures/api.fixture';
import { API_BASE_URL } from '../support/env';

test.describe('API Delicias Express - catalogo', () => {
  test('health check de la API local', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/health`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ status: 'ok' });
  });

  test('GET /api/productos devuelve JSON con data y total', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/api/productos`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body.total).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('nombre');
    expect(body.data[0]).not.toHaveProperty('password');
  });

  test('GET filtra productos por categoria', async ({ request }) => {
  const response = await request.get(`${API_BASE_URL}/api/productos`, {
    params: { categoria: 'Pasta' }
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.total).toBeGreaterThan(0);
  expect(body.data.every((p) => p.categoria === 'Pasta')).toBeTruthy();
  });

  test('HEAD /api/productos devuelve cabeceras sin body', async ({ request }) => {
    const response = await request.head(`${API_BASE_URL}/api/productos`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('OPTIONS /api/productos documenta metodos permitidos', async ({ request }) => {
    const response = await request.fetch(`${API_BASE_URL}/api/productos`, { method: 'OPTIONS' });
    expect(response.status()).toBeLessThan(500);
    expect(response.headers()['allow']).toContain('GET');
  });

  test('POST crea solicitud y DELETE la limpia', async ({ request }) => {
    const create = await request.post(`${API_BASE_URL}/api/solicitudes`, {
      data: {
        nombre: 'Ana Alumna',
        email: 'ana.alumna@test.local',
        producto: 'Pasta carbonara'
      }
    });

    expect(create.status()).toBe(201);
    expect(create.headers()['location']).toContain('/api/solicitudes/');
    const solicitud = await create.json();

    const deleted = await request.delete(`${API_BASE_URL}/api/solicitudes/${solicitud.id}`);
    expect([200, 204]).toContain(deleted.status());
  });
  
  test('API Client busca productos de pasta', async ({ productosApi }) => {
    const body = await productosApi.buscarPorTexto('pasta');
    expect(body.total).toBeGreaterThan(0);
    expect(
      body.data.every((producto) => {
        const texto = `${producto.nombre} ${producto.categoria} ${producto.etiqueta}`.toLowerCase();
        return texto.includes('pasta');
      })
    ).toBeTruthy();
  });


});
