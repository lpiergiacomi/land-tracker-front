import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LotParams} from "../model/lot";

@Injectable()
export class LotsApi {
  private readonly apiController: string = 'lots';

  constructor(private api: HttpService) {}

  getAllLots() {
    return this.api.get(`${this.apiController}`);
  }

  getAllById(id: number) {
    return this.api.get(`${this.apiController}/${id}`);
  }

  getFilteredLots(params: LotParams) {
    return this.api.post(`${this.apiController}/filter`, params);
  }
}
