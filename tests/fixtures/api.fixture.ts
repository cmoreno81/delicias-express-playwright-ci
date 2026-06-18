import { test as base, expect } from '@playwright/test';
import { ProductosApiClient } from '../api-client/ProductosApiClient';

type ApiFixtures = {
  productosApi: ProductosApiClient;
};

export const test = base.extend<ApiFixtures>({
  productosApi: async ({ request }, use) => {
    await use(new ProductosApiClient(request));
  }
});

export { expect };
