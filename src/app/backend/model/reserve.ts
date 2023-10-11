export class Reserve {

  id: number;
  lotId: number;
  clientId: number;

  constructor(idLot: number, idClient: number) {
    this.lotId = idLot;
    this.clientId = idClient;
  }
}
