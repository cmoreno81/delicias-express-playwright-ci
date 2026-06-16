import { expect, Page } from '@playwright/test';

export class SearchBoxComponent {
  constructor(private readonly page: Page) {}

  input() {
    return this.page.getByRole('searchbox', { name: /buscar productos/i });
  }

  botonLimpiar() {
    return this.page.getByRole('button', { name: 'Limpiar' });
  }

  async comprobarVisible() {
    await expect(this.input()).toBeVisible();
    await expect(this.botonLimpiar()).toBeVisible();
  }

  async rellenar(texto: string) {
    await this.input().fill(texto);
  }

  async escribirComoUsuario(texto: string) {
    await this.input().click();
    await this.input().pressSequentially(texto);
  }

  async limpiar() {
    await this.botonLimpiar().click();
  }
}
