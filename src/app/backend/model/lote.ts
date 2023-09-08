export class Lote {

  id: number;
  nombre: string;
  superficie: number;
  estadoLote: string;
  posicionLote: PosicionLote;
  metrosFrente: number;
  metrosFondo: number;
  nroCuentaCatastral: string;
  nroCuentaMunicipal: string;
  tieneLuz: boolean;
  tieneAgua: boolean;
  precio: number;
  descriptionDomElement?: HTMLElement

  constructor() {
  }
}

export class PosicionLote {

  x: number;
  y: number;
  z: number;

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
