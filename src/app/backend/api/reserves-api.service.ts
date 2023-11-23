import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Reserve} from "../model/reserve";
import {HttpParams} from "@angular/common/http";

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

  updateDueDate(reserveId: any, dueDate: Date) {
    const params = new HttpParams()
      .set('dueDate', dueDate.toString());
    return this.api.put(`${this.apiController}/update-due-date/${reserveId}`, null, {params});
  }
}
