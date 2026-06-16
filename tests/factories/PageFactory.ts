import { Page } from '@playwright/test';
import { InicioPage } from '../pages/InicioPage';
import { ProductosPage } from '../pages/ProductosPage';
import { ConsejosPage } from '../pages/ConsejosPage';
import { BusquedaStrategy } from '../strategies/BusquedaStrategy';

export type NombrePagina = 'inicio' | 'productos' | 'consejos';

export class PageFactory {
  static crear(nombre: 'inicio', page: Page): InicioPage;
  static crear(nombre: 'productos', page: Page, busquedaStrategy?: BusquedaStrategy): ProductosPage;
  static crear(nombre: 'consejos', page: Page): ConsejosPage;
  static crear(nombre: NombrePagina, page: Page, busquedaStrategy?: BusquedaStrategy) {
    switch (nombre) {
      case 'inicio':
        return new InicioPage(page);
      case 'productos':
        return new ProductosPage(page, busquedaStrategy);
      case 'consejos':
        return new ConsejosPage(page);
      default:
        throw new Error(`Página no soportada: ${nombre}`);
    }
  }
}
