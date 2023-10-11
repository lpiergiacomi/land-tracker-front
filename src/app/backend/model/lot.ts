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

  constructor() {
  }
}

export class LoteParams {
  nombre: string;
  precioMin: number;
  precioMax: number;
  estados: string[];

  constructor(nombre: string, precioMin: number, precioMax: number, estados: string[]) {
    this.nombre = nombre;
    this.precioMin = precioMin;
    this.precioMax = precioMax;
    this.estados = estados;
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
