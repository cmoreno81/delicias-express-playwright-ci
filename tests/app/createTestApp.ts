import { Page } from '@playwright/test';
import { TestApp, AppDependencies } from './TestApp';
import { BusquedaPorRellenadoStrategy } from '../strategies/BusquedaStrategy';

export function createDefaultDependencies(): AppDependencies {
  return {
    busquedaStrategy: new BusquedaPorRellenadoStrategy()
  };
}

export function createTestApp(page: Page, overrides: Partial<AppDependencies> = {}) {
  return new TestApp(page, {
    ...createDefaultDependencies(),
    ...overrides
  });
}
