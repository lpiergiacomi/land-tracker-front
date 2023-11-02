import {User} from "./user";

export class Reserve {

  id: number;
  lotId: number;
  clientId: number;
  user: User;
  clientName: string;
  createdDate: string;
  dueDate: string;
  state: string;

  constructor(idLot: number, idClient: number, dueDate: string) {
    this.lotId = idLot;
    this.clientId = idClient;
    this.dueDate = dueDate;
  }
}
