import {Injectable} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {PaymentsApi} from "../api/payments-api.service";
import {Payment} from "../model/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private api: PaymentsApi) {
  }

  async createPayment(payment: Payment){
    const formData: FormData = new FormData();
    formData.append('file', payment.file);
    formData.append('lotId', payment.lotId.toString());
    formData.append('userId', payment.userId.toString());
    formData.append('amount', payment.amount.toString());
    formData.append('reason', payment.reason.toString());

    return await lastValueFrom(this.api.createPayment(formData));
  }

  async getPaymentsByLotId(lotId: number) {
    return await lastValueFrom(this.api.getPaymentsByLotId(lotId));
  }
}
