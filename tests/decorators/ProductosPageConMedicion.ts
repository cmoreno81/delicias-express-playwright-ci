import { PaginaProductos } from '../pages/ProductosPage';

export class ProductosPageConMedicion implements PaginaProductos {
  constructor(private readonly productosPage: PaginaProductos) {}

  async abrir() {
    const inicio = Date.now();
    await this.productosPage.abrir();
    console.log(`[ProductosPage] abrir() tardó ${Date.now() - inicio} ms`);
  }

  async buscar(texto: string) {
    const inicio = Date.now();
    await this.productosPage.buscar(texto);
    console.log(`[ProductosPage] buscar("${texto}") tardó ${Date.now() - inicio} ms`);
  }
}
