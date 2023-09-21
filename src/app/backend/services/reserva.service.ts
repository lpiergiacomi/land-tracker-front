import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ReservasApi} from "../api/reservas.api";
import {Reserva} from "../model/reserva";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private api: ReservasApi) {
  }

  getAllReservas(): Observable<Reserva[]> {
    return this.api.getAllReservas();
  }

  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.api.crearReserva(reserva);
  }

}
