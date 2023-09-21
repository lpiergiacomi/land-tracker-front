export class Reserva {

  id: number;
  idLote: number;
  idCliente: number;

  constructor(idLote: number, idCliente: number) {
    this.idLote = idLote;
    this.idCliente = idCliente;
  }
}
