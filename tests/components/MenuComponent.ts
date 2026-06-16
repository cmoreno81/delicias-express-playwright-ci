import { expect, Page } from '@playwright/test';

export class MenuComponent {
  constructor(private readonly page: Page) {}

  raiz() {
    return this.page.getByRole('navigation', { name: /navegación principal/i });
  }

  inicio() {
    return this.page.getByRole('link', { name: 'Ir a la página de inicio' });
  }

  productos() {
    return this.page.getByRole('link', { name: 'Productos', exact: true });
  }

  consejos() {
    return this.page.getByRole('link', { name: 'Consejos', exact: true });
  }

  async comprobarVisible() {
    await expect(this.raiz()).toBeVisible();
    await expect(this.inicio()).toBeVisible();
    await expect(this.productos()).toBeVisible();
    await expect(this.consejos()).toBeVisible();
  }

  async comprobarPaginaActiva(nombre: 'Inicio' | 'Productos' | 'Consejos') {
    await expect(this.page.getByRole('link', { name: nombre, exact: true })).toBeVisible();
  }

  async irAInicio() {
    await this.inicio().click();
  }

  async irAProductos() {
    await this.productos().click();
  }

  async irAConsejos() {
    await this.consejos().click();
  }
}
