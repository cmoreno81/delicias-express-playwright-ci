const listaProductos = document.querySelector('#lista-productos');
const inputBusqueda = document.querySelector('#busqueda-productos');
const botonLimpiar = document.querySelector('#limpiar-busqueda');
const contadorProductos = document.querySelector('#contador-productos');
const panelSinResultados = document.querySelector('#sin-resultados');

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function coincideConBusqueda(producto, texto) {
  const criterio = normalizar(texto.trim());

  if (!criterio) {
    return true;
  }

  const contenido = normalizar([
    producto.nombre,
    producto.categoria,
    producto.etiqueta,
    producto.descripcion
  ].join(' '));

  return contenido.includes(criterio);
}

function crearCardProducto(producto) {
  const article = document.createElement('article');
  article.className = 'producto-card';
  article.setAttribute('aria-label', producto.nombre);

  article.innerHTML = `
    <div class="producto-imagen" aria-hidden="true">${producto.icono}</div>
    <h2 class="producto-nombre">${producto.nombre}</h2>
    <p class="producto-descripcion">${producto.descripcion}</p>
    <div class="producto-meta">
      <span class="producto-categoria">Categoría: ${producto.categoria}</span>
      <span class="producto-etiqueta">Etiqueta: ${producto.etiqueta}</span>
    </div>
    <div class="producto-footer">
      <span class="producto-precio">${producto.precio}</span>
      <button class="producto-boton" type="button" aria-label="Añadir ${producto.nombre}">Añadir</button>
    </div>
  `;

  return article;
}

function renderizarProductos(textoBusqueda = '') {
  const productosFiltrados = productos.filter((producto) => coincideConBusqueda(producto, textoBusqueda));

  listaProductos.innerHTML = '';

  productosFiltrados.forEach((producto) => {
    listaProductos.appendChild(crearCardProducto(producto));
  });

  contadorProductos.textContent = `Mostrando ${productosFiltrados.length} producto${productosFiltrados.length === 1 ? '' : 's'}`;
  panelSinResultados.hidden = productosFiltrados.length > 0;
}

if (listaProductos && inputBusqueda && botonLimpiar) {
  renderizarProductos();

  inputBusqueda.addEventListener('input', (event) => {
    renderizarProductos(event.target.value);
  });

  botonLimpiar.addEventListener('click', () => {
    inputBusqueda.value = '';
    inputBusqueda.focus();
    renderizarProductos();
  });
}
