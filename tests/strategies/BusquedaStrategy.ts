import { SearchBoxComponent } from '../components/SearchBoxComponent';

export interface BusquedaStrategy {
  readonly nombre: string;
  buscar(searchBox: SearchBoxComponent, texto: string): Promise<void>;
}

export class BusquedaPorRellenadoStrategy implements BusquedaStrategy {
  readonly nombre = 'rellenado-directo';

  async buscar(searchBox: SearchBoxComponent, texto: string) {
    await searchBox.rellenar(texto);
  }
}

export class BusquedaConTecladoStrategy implements BusquedaStrategy {
  readonly nombre = 'teclado-realista';

  async buscar(searchBox: SearchBoxComponent, texto: string) {
    await searchBox.input().fill('');
    await searchBox.escribirComoUsuario(texto);
  }
}
