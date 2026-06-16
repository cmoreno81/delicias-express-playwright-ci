import { expect, Locator } from '@playwright/test';

export class ProductoCardComponent {
  constructor(private readonly card: Locator) {}

  nombre() {
    return this.card.locator('.producto-nombre');
  }

  descripcion() {
    return this.card.locator('.producto-descripcion');
  }

  categoria() {
    return this.card.locator('.producto-categoria');
  }

  etiqueta() {
    return this.card.locator('.producto-etiqueta');
  }

  precio() {
    return this.card.locator('.producto-precio');
  }

  botonAnadir() {
    return this.card.getByRole('button', { name: /añadir/i });
  }

  async comprobarDatosBasicosVisibles() {
    await expect(this.nombre()).toBeVisible();
    await expect(this.descripcion()).toBeVisible();
    await expect(this.categoria()).toBeVisible();
    await expect(this.etiqueta()).toBeVisible();
    await expect(this.precio()).toBeVisible();
    await expect(this.botonAnadir()).toBeVisible();
  }
}
