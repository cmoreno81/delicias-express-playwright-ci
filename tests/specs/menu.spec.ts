import { test, expect } from '../fixtures/app.fixture';

const paginas = [
  { ruta: '/index.html', activa: 'Inicio' as const },
  { ruta: '/productos.html', activa: 'Productos' as const },
  { ruta: '/consejos.html', activa: 'Consejos' as const }
];

test.describe('MenuComponent', () => {
  for (const pagina of paginas) {
    test(`el menú aparece correctamente en ${pagina.ruta}`, async ({ page, menu }) => {
      await page.goto(pagina.ruta);

      await menu.comprobarVisible();
      await menu.comprobarPaginaActiva(pagina.activa);
    });
  }

  test('navega entre las páginas principales', async ({ page, menu }) => {
    await page.goto('/index.html');

    await menu.irAProductos();
    await expect(page).toHaveURL(/productos\.html/);

    await menu.irAConsejos();
    await expect(page).toHaveURL(/consejos\.html/);

    await menu.irAInicio();
    await expect(page).toHaveURL(/index\.html/);
  });
});
