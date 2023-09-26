export class Cliente {

  id: number;
  nombre: string;
  documento: number;
  email: string;
  telefono: string;
  direccion: string;

  constructor() {
  }
}

export class ClienteParams {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}
