import { test } from '../fixtures/app.fixture';

test.describe('Flujos E2E completos', () => {
  test('Inicio → Productos → Buscar saludable', async ({ app }) => {
    await app.abrirInicioYBuscarProductoSaludable();
  });

  test('Consejos → Productos → Buscar pasta', async ({ app }) => {
    await app.irDeConsejosAProductosYBuscarPasta();
  });

  test('Productos → Buscar algo inexistente → Sin resultados', async ({ app }) => {
    await app.comprobarSinResultados();
  });
});
