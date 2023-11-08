import {User} from "./user";
import {Client} from "./client";

export class Payment {

  id: number;
  lotId: number;
  client: Client;
  user: User;
  amount: number;
  createdDate: string;
  file: File;
  clientId: number;

  constructor(lotId: number, amount: number, file: File, user: User) {
    this.lotId = lotId;
    this.amount = amount;
    this.file = file;
    this.user = user;
  }
}
