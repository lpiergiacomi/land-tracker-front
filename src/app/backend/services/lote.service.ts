import { Injectable } from '@angular/core';
import { LotesApi } from '../api/lotes.api';
import {lastValueFrom, Observable} from 'rxjs';
import {Lote, LoteParams} from '../model/lote';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private api: LotesApi) { }

  async getLotes(): Promise<Lote[]> {
    const lotesPromise = this.api.getAllLotes();
    return await lastValueFrom(lotesPromise);
  }

  getLoteById(id: number): Observable<Lote> {
    return this.api.getAllById(id);
  }

  getLotesFiltrados(params: LoteParams) {
    return this.api.getLotesFiltrados(params);
  }
}
