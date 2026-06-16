import { test, expect } from '../fixtures/app.fixture';
import { TestDataFactory } from '../factories/TestDataFactory';
import { PRODUCTOS_ESPERADOS } from '../data/productos';

const casosBusqueda = [
  TestDataFactory.busquedaPorNombrePollo(),
  TestDataFactory.busquedaPorCategoriaPasta(),
  TestDataFactory.busquedaPorEtiquetaVegetal(),
  TestDataFactory.busquedaSaludable()
];

test.describe('SearchBoxComponent y filtrado de productos', () => {
  for (const caso of casosBusqueda) {
    test(caso.descripcion, async ({ productosPage }) => {
      await productosPage.abrir();
      await productosPage.buscar(caso.textoBusqueda);

      await productosPage.comprobarProductosVisibles(caso.resultadoEsperado);
    });
  }

  test('muestra mensaje si no hay resultados', async ({ productosPage }) => {
    const caso = TestDataFactory.busquedaSinResultados();

    await productosPage.abrir();
    await productosPage.buscar(caso.textoBusqueda);

    await productosPage.comprobarCantidad(0);
    await expect(productosPage.mensajeSinResultados()).toBeVisible();
  });

  test('restaura todos los productos al limpiar la búsqueda', async ({ productosPage }) => {
    await productosPage.abrir();
    await productosPage.buscar('pollo');
    await productosPage.comprobarCantidad(1);

    await productosPage.limpiarBusqueda();

    await productosPage.comprobarCantidad(PRODUCTOS_ESPERADOS.length);
  });
});
