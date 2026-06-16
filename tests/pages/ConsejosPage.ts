import { expect, Page } from '@playwright/test';
import { MenuComponent } from '../components/MenuComponent';

export class ConsejosPage {
  readonly menu: MenuComponent;

  constructor(private readonly page: Page) {
    this.menu = new MenuComponent(page);
  }

  async abrir() {
    await this.page.goto('/consejos.html');
  }

  titulo() {
    return this.page.getByRole('heading', { name: /consejos para disfrutar mejor tus platos/i });
  }

  consejo(nombre: string | RegExp) {
    return this.page.getByRole('heading', { name: nombre });
  }

  preguntaFrecuente(texto: string | RegExp) {
    return this.page.getByText(texto);
  }

  async comprobarCargada() {
    await expect(this.titulo()).toBeVisible();
    await expect(this.consejo(/conservación/i)).toBeVisible();
    await expect(this.consejo(/calentado/i)).toBeVisible();
  }
}
