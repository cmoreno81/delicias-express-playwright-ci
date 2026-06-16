import { test, expect } from '../fixtures/app.fixture';

test.describe('Inicio', () => {
  test('muestra la presentación de la empresa', async ({ inicioPage }) => {
    await inicioPage.abrir();

    await inicioPage.comprobarCargada();
    await expect(inicioPage.enlaceVerProductos()).toBeVisible();
  });

  test('permite ir desde inicio hasta productos', async ({ inicioPage, productosPage }) => {
    await inicioPage.abrir();
    await inicioPage.irAProductos();

    await expect(productosPage.titulo()).toBeVisible();
  });
});
