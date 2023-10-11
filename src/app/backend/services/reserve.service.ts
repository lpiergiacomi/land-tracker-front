import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ReservesApi} from "../api/reserves-api.service";
import {Reserve} from "../model/reserve";

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private api: ReservesApi) {
  }

  getAllReserves(): Observable<Reserve[]> {
    return this.api.getAllReserves();
  }

  createReserve(reserve: Reserve): Observable<Reserve> {
    return this.api.createReserve(reserve);
  }

}
