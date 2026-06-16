import { expect, Page } from '@playwright/test';
import { InicioPage } from '../pages/InicioPage';
import { ProductosPage } from '../pages/ProductosPage';
import { ConsejosPage } from '../pages/ConsejosPage';
import { MenuComponent } from '../components/MenuComponent';
import { BusquedaStrategy } from '../strategies/BusquedaStrategy';
import { TestDataFactory } from '../factories/TestDataFactory';

export type AppDependencies = {
  busquedaStrategy: BusquedaStrategy;
};

export class TestApp {
  readonly inicio: InicioPage;
  readonly productos: ProductosPage;
  readonly consejos: ConsejosPage;
  readonly menu: MenuComponent;

  constructor(
    private readonly page: Page,
    private readonly dependencies: AppDependencies
  ) {
    this.inicio = new InicioPage(page);
    this.productos = new ProductosPage(page, dependencies.busquedaStrategy);
    this.consejos = new ConsejosPage(page);
    this.menu = new MenuComponent(page);
  }

  dependenciaActual() {
    return this.dependencies.busquedaStrategy.nombre;
  }

  async abrirInicioYBuscarProductoSaludable() {
    const caso = TestDataFactory.busquedaSaludable();

    await this.inicio.abrir();
    await this.inicio.irAProductos();
    await this.productos.buscar(caso.textoBusqueda);
    await this.productos.comprobarProductosVisibles(caso.resultadoEsperado);
  }

  async irDeConsejosAProductosYBuscarPasta() {
    const caso = TestDataFactory.busquedaPorCategoriaPasta();

    await this.consejos.abrir();
    await this.menu.irAProductos();
    await this.productos.buscar(caso.textoBusqueda);
    await this.productos.comprobarProductosVisibles(caso.resultadoEsperado);
  }

  async comprobarSinResultados() {
    const caso = TestDataFactory.busquedaSinResultados();

    await this.productos.abrir();
    await this.productos.buscar(caso.textoBusqueda);
    await this.productos.comprobarCantidad(0);
    await expect(this.productos.mensajeSinResultados()).toBeVisible();
  }
}
