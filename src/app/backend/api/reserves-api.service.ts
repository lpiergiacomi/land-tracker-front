import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Reserve} from "../model/reserve";

@Injectable()
export class ReservasApi {
  private readonly apiController: string = 'reservas';

  constructor(private api: HttpService) {
  }

  getAllReservas() {
    return this.api.get(`${this.apiController}`);
  }

  crearReserva(reserva: Reserve) {
    return this.api.post(`${this.apiController}`, reserva);
  }


}
