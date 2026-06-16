import { test, expect } from '../fixtures/app.fixture';
import { BusquedaProductoBuilder } from '../builders/BusquedaProductoBuilder';
import { PageFactory } from '../factories/PageFactory';
import { ProductosPage } from '../pages/ProductosPage';
import { ProductosPageConLogs } from '../decorators/ProductosPageConLogs';
import { ProductosPageConMedicion } from '../decorators/ProductosPageConMedicion';

test.describe('Patrones de diseño aplicados al laboratorio', () => {
  test('Builder: construye un caso de búsqueda expresivo', async ({ productosPage }) => {
    const caso = BusquedaProductoBuilder.unaBusqueda()
      .conDescripcion('búsqueda de platos tradicionales')
      .conTexto('tradicional')
      .esperaProductos(['Albóndigas con tomate', 'Tortilla de patata'])
      .build();

    await productosPage.abrir();
    await productosPage.buscar(caso.textoBusqueda);

    await productosPage.comprobarProductosVisibles(caso.resultadoEsperado);
  });

  test('Factory Method: crea Page Objects desde una factoría centralizada', async ({ page }) => {
    const inicioPage = PageFactory.crear('inicio', page);
    const productosPage = PageFactory.crear('productos', page);
    const consejosPage = PageFactory.crear('consejos', page);

    await inicioPage.abrir();
    await inicioPage.menu.irAProductos();
    await expect(productosPage.titulo()).toBeVisible();

    await productosPage.menu.irAConsejos();
    await expect(consejosPage.titulo()).toBeVisible();
  });

  test('Decorator: añade logs sin modificar ProductosPage', async ({ page }) => {
    const productosBase = new ProductosPage(page);
    const productosConLogs = new ProductosPageConLogs(productosBase);

    await productosConLogs.abrir();
    await productosConLogs.buscar('pollo');

    await expect(productosBase.productoPorNombre('Pollo al curry')).toBeVisible();
  });

  test('Decorator: añade medición de tiempo sin tocar el Page Object original', async ({ page }) => {
    const productosBase = new ProductosPage(page);
    const productosConMedicion = new ProductosPageConMedicion(productosBase);

    await productosConMedicion.abrir();
    await productosConMedicion.buscar('pasta');

    await expect(productosBase.productos()).toHaveCount(2);
  });
});
