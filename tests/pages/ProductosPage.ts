import { expect, Locator, Page } from '@playwright/test';
import { MenuComponent } from '../components/MenuComponent';
import { ProductoCardComponent } from '../components/ProductoCardComponent';
import { SearchBoxComponent } from '../components/SearchBoxComponent';
import { BusquedaPorRellenadoStrategy, BusquedaStrategy } from '../strategies/BusquedaStrategy';

export interface PaginaProductos {
  abrir(): Promise<void>;
  buscar(texto: string): Promise<void>;
}

export class ProductosPage implements PaginaProductos {
  readonly menu: MenuComponent;
  readonly buscador: SearchBoxComponent;

  constructor(
    private readonly page: Page,
    private readonly busquedaStrategy: BusquedaStrategy = new BusquedaPorRellenadoStrategy()
  ) {
    this.menu = new MenuComponent(page);
    this.buscador = new SearchBoxComponent(page);
  }

  async abrir() {
    await this.page.goto('/productos.html');
  }

  titulo() {
    return this.page.getByRole('heading', { name: /nuestros platos preparados/i });
  }

  productos(): Locator {
    return this.page.locator('.producto-card');
  }

  productoPorNombre(nombre: string): Locator {
    return this.productos().filter({ hasText: nombre });
  }

  primeraCard() {
    return new ProductoCardComponent(this.productos().first());
  }

  card(indice: number) {
    return new ProductoCardComponent(this.productos().nth(indice));
  }

  contador() {
    return this.page.locator('#contador-productos');
  }

  mensajeSinResultados() {
    return this.page.getByRole('heading', { name: /no hay productos para esa búsqueda/i });
  }

  async buscar(texto: string) {
    await this.busquedaStrategy.buscar(this.buscador, texto);
  }

  async limpiarBusqueda() {
    await this.buscador.limpiar();
  }

  async comprobarCargada() {
    await expect(this.titulo()).toBeVisible();
    await this.buscador.comprobarVisible();
  }

  async comprobarCantidad(cantidad: number) {
    await expect(this.productos()).toHaveCount(cantidad);
    await expect(this.contador()).toContainText(`Mostrando ${cantidad} producto`);
  }

  async comprobarProductosVisibles(nombres: string[]) {
    await this.comprobarCantidad(nombres.length);
    for (const nombre of nombres) {
      await expect(this.productoPorNombre(nombre)).toBeVisible();
    }
  }
}
