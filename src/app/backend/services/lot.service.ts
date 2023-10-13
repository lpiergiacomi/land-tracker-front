import { Injectable } from '@angular/core';
import { LotsApi } from '../api/lots-api.service';
import {lastValueFrom, Observable} from 'rxjs';
import {Lot, LotParams} from '../model/lot';
import {UserWithLot} from "../model/user-with-lot";

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private api: LotsApi) { }

  async getAllLots(): Promise<Lot[]> {
    const lotsPromise = this.api.getAllLots();
    return await lastValueFrom(lotsPromise);
  }

  getLotById(id: number): Observable<Lot> {
    return this.api.getAllById(id);
  }

  getFilteredLots(params: LotParams) {
    return this.api.getFilteredLots(params);
  }

  updateAssignedLotsToUser(selectedUser: UserWithLot) {
    return this.api.updateAssignedLotsToUser(selectedUser);
  }
}
