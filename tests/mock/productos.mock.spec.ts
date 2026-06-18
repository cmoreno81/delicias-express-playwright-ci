import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../support/env';

test('UI muestra un producto controlado por mock', async ({ page }) => {
  await page.route(`${API_BASE_URL}/api/productos**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        total: 1,
        data: [{
          id: 'mock-risotto',
          nombre: 'Risotto mockeado',
          categoria: 'Arroces',
          etiqueta: 'Controlado',
          precio: '6,66 EUR'
        }]
      })
    });
  });

  await page.goto('/productos.html?fuente=api');
  await expect(page.getByText('Risotto mockeado')).toBeVisible();
});

test('UI informa cuando la API devuelve error 500', async ({ page }) => {
  await page.route(`${API_BASE_URL}/api/productos**`, async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' })
    });
  });

  await page.goto('/productos.html?fuente=api');
  await expect(page.getByRole('heading', { name: /no se pudo cargar el catalogo/i })).toBeVisible();
  await expect(page.locator('#contador-productos')).toHaveText(/no se pudo cargar el catalogo/i);
});
