import { test as base, expect } from '@playwright/test';
import { InicioPage } from '../pages/InicioPage';
import { ProductosPage } from '../pages/ProductosPage';
import { ConsejosPage } from '../pages/ConsejosPage';
import { MenuComponent } from '../components/MenuComponent';
import { TestApp } from '../app/TestApp';
import { createTestApp } from '../app/createTestApp';
import { BusquedaPorRellenadoStrategy } from '../strategies/BusquedaStrategy';

export type FixturesAplicacion = {
  inicioPage: InicioPage;
  productosPage: ProductosPage;
  consejosPage: ConsejosPage;
  menu: MenuComponent;
  app: TestApp;
};

export const test = base.extend<FixturesAplicacion>({
  inicioPage: async ({ page }, usar) => {
    await usar(new InicioPage(page));
  },

  productosPage: async ({ page }, usar) => {
    await usar(new ProductosPage(page, new BusquedaPorRellenadoStrategy()));
  },

  consejosPage: async ({ page }, usar) => {
    await usar(new ConsejosPage(page));
  },

  menu: async ({ page }, usar) => {
    await usar(new MenuComponent(page));
  },

  app: async ({ page }, usar) => {
    await usar(createTestApp(page));
  }
});

export { expect };
