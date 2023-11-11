export class Payment {

  id: number;
  lotId: number;
  clientId: number;
  clientName: string;
  userId: number;
  username: string;
  amount: number;
  createdDate: string;
  file: File;
  reason: string;

  constructor(lotId: number, amount: number, file: File, userId: number, reason: string) {
    this.lotId = lotId;
    this.amount = amount;
    this.file = file;
    this.userId = userId;
    this.reason = reason;
  }
}
