import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Reserve} from "../model/reserve";

@Injectable()
export class ReservesApi {
  private readonly apiController: string = 'reserves';

  constructor(private api: HttpService) {
  }

  getAllReserves() {
    return this.api.get(`${this.apiController}`);
  }

  createReserve(reserve: Reserve) {
    return this.api.post(`${this.apiController}`, reserve);
  }


}
