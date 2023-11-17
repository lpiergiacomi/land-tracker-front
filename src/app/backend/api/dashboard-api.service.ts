import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class DashboardApi {
  private readonly apiController: string = 'dashboard';

  constructor(private api: HttpService) {
  }

  getPaymentsWithTimeScale(timeScale: string) {
    return this.api.get(`${this.apiController}/charts-info/${timeScale}`)
  }

  getDashboardCardsInfo(timeScale: string) {
    return this.api.get(`${this.apiController}/cards-info/${timeScale}`)
  }


}
