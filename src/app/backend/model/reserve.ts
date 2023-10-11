export class Reserve {

  id: number;
  idLot: number;
  idClient: number;

  constructor(idLot: number, idClient: number) {
    this.idLot = idLot;
    this.idClient = idClient;
  }
}
