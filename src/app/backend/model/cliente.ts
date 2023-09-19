export class Cliente {

  id: number;
  nombre: string;

  constructor() {
  }
}

export class ClienteParams {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}
