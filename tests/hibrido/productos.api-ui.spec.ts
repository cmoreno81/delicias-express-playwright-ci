import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../support/env';
import { ProductosPage } from '../pages/ProductosPage';

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

test('API obtiene producto y UI lo muestra al buscar', async ({ request, page }) => {
  const apiResponse = await request.get(`${API_BASE_URL}/api/productos`, {
    params: { q: 'pasta' }
  });
  expect(apiResponse.ok()).toBeTruthy();
  const body = await apiResponse.json();
  const productoEsperado = body.data[0].nombre;

  const productosPage = new ProductosPage(page);
  await productosPage.abrirDesdeApi();

  const nombresIniciales = await page.locator('.producto-card .producto-nombre').allTextContents();
  expect(nombresIniciales.map(normalizar)).toContain(normalizar(productoEsperado));

  await productosPage.buscar('pasta');
  await expect(page.locator('.producto-card')).toHaveCount(2);

  const nombresFiltrados = await page.locator('.producto-card .producto-nombre').allTextContents();
  expect(nombresFiltrados.map(normalizar)).toContain(normalizar(productoEsperado));
});

