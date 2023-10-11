import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LoteParams} from "../model/lote";

@Injectable()
export class LotesApi {
  private readonly apiController: string = 'lotes';

  constructor(private api: HttpService) {}

  getAllLotes() {
    return this.api.get(`${this.apiController}`);
  }

  getAllById(id: number) {
    return this.api.get(`${this.apiController}/${id}`);
  }

  getLotesFiltrados(params: LoteParams) {
    return this.api.post(`${this.apiController}/filter`, params);
  }
}
