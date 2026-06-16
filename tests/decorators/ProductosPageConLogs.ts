import { PaginaProductos } from '../pages/ProductosPage';

export class ProductosPageConLogs implements PaginaProductos {
  constructor(private readonly productosPage: PaginaProductos) {}

  async abrir() {
    console.log('[ProductosPage] Abriendo página de productos');
    await this.productosPage.abrir();
  }

  async buscar(texto: string) {
    console.log(`[ProductosPage] Buscando: ${texto}`);
    await this.productosPage.buscar(texto);
  }
}
