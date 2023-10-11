import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ReservasApi} from "../api/reservas.api";
import {Reserve} from "../model/reserve";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private api: ReservasApi) {
  }

  getAllReservas(): Observable<Reserve[]> {
    return this.api.getAllReservas();
  }

  crearReserva(reserva: Reserve): Observable<Reserve> {
    return this.api.crearReserva(reserva);
  }

}
