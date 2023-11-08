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
    formData.append('userId', payment.user.id.toString());
    formData.append('amount', payment.amount.toString());

    return await lastValueFrom(this.api.createPayment(formData));
  }

}
