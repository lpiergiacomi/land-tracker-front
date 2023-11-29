import {Injectable} from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {ReservesApi} from "../api/reserves-api.service";
import {Reserve} from "../model/reserve";

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private api: ReservesApi) {
  }

  async getAllReserves() {
    return await lastValueFrom(this.api.getAllReserves());
  }

  async createReserve(reserve: Reserve){
    return await lastValueFrom(this.api.createReserve(reserve));
  }

  async updateDueDate(reserveId: any, dueDate: Date, lotId: number, userId: number) {
    return await lastValueFrom(this.api.updateDueDate(reserveId, dueDate, lotId, userId));
  }
}
