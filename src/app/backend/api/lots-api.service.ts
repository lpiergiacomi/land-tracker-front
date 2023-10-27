import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Lot, LotParams} from "../model/lot";
import {UserWithLot} from "../model/user-with-lot";
import {map, Observable} from "rxjs";

@Injectable()
export class LotsApi {
  private readonly apiController: string = 'lots';

  constructor(private api: HttpService) {}

  getAllLots(): Observable<Lot[]> {
    return this.api.get(`${this.apiController}`).pipe(
        map(data => data.map(item => this.convertToLot(item)))
    );
  }

  getAllById(id: number): Observable<Lot> {
    return this.api.get(`${this.apiController}/${id}`).pipe(
        map(data => this.convertToLot(data))
    );
  }

  getFilteredLots(params: LotParams) {
    return this.api.post(`${this.apiController}/filter`, params);
  }

  updateAssignedLotsToUser(selectedUser: UserWithLot) {
    return this.api.post(`${this.apiController}/update-assigned-lots-to-user`, selectedUser);
  }

  private convertToLot(data: any): Lot {
    const lot = new Lot();
    Object.assign(lot, data);
    return lot;
  }
}
