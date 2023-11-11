import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class PaymentsApi {
  private readonly apiController: string = 'payments';

  constructor(private api: HttpService) {
  }

  createPayment(formData: FormData) {
    return this.api.post(`${this.apiController}`, formData);
  }

  getPaymentsByLotId(lotId: number) {
    return this.api.get(`${this.apiController}/lot/${lotId}`)
  }
}
