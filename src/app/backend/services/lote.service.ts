import { Injectable } from '@angular/core';
import { LotesApi } from '../api/lotes.api';
import { Observable } from 'rxjs';
import { Lote } from '../model/lote';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private api: LotesApi) { }

  getLotes(): Observable<Lote[]> {
    return this.api.getAllLotes();
  }

  getLoteById(id: number): Observable<Lote> {
    return this.api.getAllById(id);
  }
}
