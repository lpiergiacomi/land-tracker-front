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

  async getLotById(id: number): Promise<Lot> {
    return await lastValueFrom(this.api.getAllById(id));
  }

  async getFilteredLots(params: LotParams) {
    return await lastValueFrom(this.api.getFilteredLots(params));
  }

  async updateAssignedLotsToUser(selectedUser: UserWithLot) {
    return await lastValueFrom(this.api.updateAssignedLotsToUser(selectedUser));
  }

  async getLotsQuantityByState() {
    return await lastValueFrom(this.api.getLotsQuantityByState())
  }
}
