import { Injectable } from '@angular/core';
import { LotesApi } from '../api/lotes.api';
import {lastValueFrom, Observable} from 'rxjs';
import {Lot, LotParams} from '../model/lot';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private api: LotesApi) { }

  async getLotes(): Promise<Lot[]> {
    const lotesPromise = this.api.getAllLotes();
    return await lastValueFrom(lotesPromise);
  }

  getLoteById(id: number): Observable<Lot> {
    return this.api.getAllById(id);
  }

  getLotesFiltrados(params: LotParams) {
    return this.api.getLotesFiltrados(params);
  }
}
