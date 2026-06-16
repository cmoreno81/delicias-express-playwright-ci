import { Page } from '@playwright/test';
import { MenuComponent } from '../components/MenuComponent';
import { SearchBoxComponent } from '../components/SearchBoxComponent';

export type NombreComponente = 'menu' | 'buscador';

export class ComponentFactory {
  static crear(nombre: 'menu', page: Page): MenuComponent;
  static crear(nombre: 'buscador', page: Page): SearchBoxComponent;
  static crear(nombre: NombreComponente, page: Page) {
    switch (nombre) {
      case 'menu':
        return new MenuComponent(page);
      case 'buscador':
        return new SearchBoxComponent(page);
      default:
        throw new Error(`Componente no soportado: ${nombre}`);
    }
  }
}
