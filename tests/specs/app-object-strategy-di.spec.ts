import { test, expect } from '@playwright/test';
import { createTestApp } from '../app/createTestApp';
import { BusquedaConTecladoStrategy, BusquedaPorRellenadoStrategy } from '../strategies/BusquedaStrategy';

test.describe('AppObject + Strategy con inyección de dependencias', () => {
  test('AppObject: agrupa páginas y flujos de negocio', async ({ page }) => {
    const app = createTestApp(page);

    await app.abrirInicioYBuscarProductoSaludable();
  });

  test('Strategy por defecto: búsqueda con fill directo', async ({ page }) => {
    const app = createTestApp(page, {
      busquedaStrategy: new BusquedaPorRellenadoStrategy()
    });

    expect(app.dependenciaActual()).toBe('rellenado-directo');

    await app.productos.abrir();
    await app.productos.buscar('pollo');
    await app.productos.comprobarProductosVisibles(['Pollo al curry']);
  });

  test('Strategy alternativa: búsqueda simulando teclado realista', async ({ page }) => {
    const app = createTestApp(page, {
      busquedaStrategy: new BusquedaConTecladoStrategy()
    });

    expect(app.dependenciaActual()).toBe('teclado-realista');

    await app.productos.abrir();
    await app.productos.buscar('pasta');
    await app.productos.comprobarProductosVisibles(['Lasaña casera', 'Pasta carbonara']);
  });
});
