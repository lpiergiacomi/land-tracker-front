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


  constructor(id, nombre, superficie, estadoLote, posicionLote, metrosFrente, metrosFondo, nroCuentaCatastral, nroCuentaMunicipal, tieneLuz, tieneAgua, precio) {
    this.id = id;
    this.nombre = nombre;
    this.superficie = superficie;
    this.estadoLote = estadoLote;
    this.posicionLote = posicionLote;
    this.metrosFrente = metrosFrente;
    this.metrosFondo = metrosFondo;
    this.nroCuentaCatastral = nroCuentaCatastral;
    this.nroCuentaMunicipal = nroCuentaMunicipal;
    this.tieneLuz = tieneLuz;
    this.tieneAgua = tieneAgua;
    this.precio = precio;
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
