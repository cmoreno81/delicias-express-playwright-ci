import { expect, Page } from '@playwright/test';
import { MenuComponent } from '../components/MenuComponent';

export class InicioPage {
  readonly menu: MenuComponent;

  constructor(private readonly page: Page) {
    this.menu = new MenuComponent(page);
  }

  async abrir() {
    await this.page.goto('/index.html');
  }

  titulo() {
    return this.page.getByRole('heading', { name: /comer bien no debería ser complicado/i });
  }

  enlaceVerProductos() {
    return this.page.getByRole('link', { name: /ver productos/i });
  }

  async irAProductos() {
    await this.enlaceVerProductos().click();
  }

  async comprobarCargada() {
    await expect(this.titulo()).toBeVisible();
    await expect(this.page.getByText(/comida preparada/i).first()).toBeVisible();
    await expect(this.enlaceVerProductos()).toBeVisible();
  }
}
