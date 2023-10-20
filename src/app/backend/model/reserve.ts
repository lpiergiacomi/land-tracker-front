import {User} from "./user";

export class Reserve {

  id: number;
  lotId: number;
  clientId: number;
  user: User;

  constructor(idLot: number, idClient: number) {
    this.lotId = idLot;
    this.clientId = idClient;
  }
}
