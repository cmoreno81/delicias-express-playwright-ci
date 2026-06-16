export type CasoBusquedaProducto = {
  textoBusqueda: string;
  resultadoEsperado: string[];
  cantidadEsperada: number;
  descripcion: string;
};

export class BusquedaProductoBuilder {
  private textoBusqueda = '';
  private resultadoEsperado: string[] = [];
  private descripcion = 'caso de búsqueda de productos';

  static unaBusqueda() {
    return new BusquedaProductoBuilder();
  }

  conDescripcion(descripcion: string) {
    this.descripcion = descripcion;
    return this;
  }

  conTexto(texto: string) {
    this.textoBusqueda = texto;
    return this;
  }

  esperaProductos(productos: string[]) {
    this.resultadoEsperado = productos;
    return this;
  }

  sinResultados() {
    this.resultadoEsperado = [];
    return this;
  }

  build(): CasoBusquedaProducto {
    return {
      textoBusqueda: this.textoBusqueda,
      resultadoEsperado: [...this.resultadoEsperado],
      cantidadEsperada: this.resultadoEsperado.length,
      descripcion: this.descripcion
    };
  }
}
