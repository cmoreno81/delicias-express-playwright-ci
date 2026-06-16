import { BusquedaProductoBuilder, CasoBusquedaProducto } from '../builders/BusquedaProductoBuilder';
import { PRODUCTOS_ESPERADOS } from '../data/productos';

export class TestDataFactory {
  static busquedaPorNombrePollo(): CasoBusquedaProducto {
    return BusquedaProductoBuilder.unaBusqueda()
      .conDescripcion('filtra por nombre de producto')
      .conTexto('pollo')
      .esperaProductos(['Pollo al curry'])
      .build();
  }

  static busquedaPorCategoriaPasta(): CasoBusquedaProducto {
    return BusquedaProductoBuilder.unaBusqueda()
      .conDescripcion('filtra por categoría')
      .conTexto('pasta')
      .esperaProductos(['Lasaña casera', 'Pasta carbonara'])
      .build();
  }

  static busquedaPorEtiquetaVegetal(): CasoBusquedaProducto {
    return BusquedaProductoBuilder.unaBusqueda()
      .conDescripcion('filtra por etiqueta o contenido vegetal')
      .conTexto('vegetal')
      .esperaProductos(['Crema de calabaza', 'Bowl vegetal', 'Arroz con verduras'])
      .build();
  }

  static busquedaSaludable(): CasoBusquedaProducto {
    return BusquedaProductoBuilder.unaBusqueda()
      .conDescripcion('filtra por platos saludables')
      .conTexto('saludable')
      .esperaProductos(['Ensalada mediterránea', 'Bowl vegetal', 'Salmón con patatas'])
      .build();
  }

  static busquedaSinResultados(): CasoBusquedaProducto {
    return BusquedaProductoBuilder.unaBusqueda()
      .conDescripcion('muestra mensaje cuando no hay resultados')
      .conTexto('hamburguesa lunar')
      .sinResultados()
      .build();
  }

  static busquedaVacia(): CasoBusquedaProducto {
    return BusquedaProductoBuilder.unaBusqueda()
      .conDescripcion('restaura todos los productos')
      .conTexto('')
      .esperaProductos(PRODUCTOS_ESPERADOS.map((producto) => producto.nombre))
      .build();
  }
}
