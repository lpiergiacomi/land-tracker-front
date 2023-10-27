import {User} from "./user";

export class Reserve {

  id: number;
  lotId: number;
  clientId: number;
  user: User;
  clientName: string;
  creationDate: string;
  dueDate: string;

  constructor(idLot: number, idClient: number) {
    this.lotId = idLot;
    this.clientId = idClient;
  }
}
