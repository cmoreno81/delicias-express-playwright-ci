import { APIRequestContext, expect } from '@playwright/test';
import { API_BASE_URL, DELICIAS_API_KEY } from '../support/env';

export class ProductosApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async buscarPorTexto(texto: string) {
    const response = await this.request.get(`${API_BASE_URL}/api/productos`, {
      params: { q: texto }
    });
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  async resumenAdmin() {
    const response = await this.request.get(`${API_BASE_URL}/api/admin/resumen`, {
      headers: { 'x-api-key': DELICIAS_API_KEY }
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }
}
