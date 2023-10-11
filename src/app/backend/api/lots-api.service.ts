import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LotParams} from "../model/lot";

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

  getLotesFiltrados(params: LotParams) {
    return this.api.post(`${this.apiController}/filter`, params);
  }
}
