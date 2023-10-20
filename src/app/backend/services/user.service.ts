import { Injectable } from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {UsersApi} from "../api/users.api";
import {UserWithLot} from "../model/user-with-lot";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: UsersApi) { }

  getAllUsersWithAssignedLots(): Observable<UserWithLot[]> {
    return this.api.getAllUsersWithAssignedLots();
  }
  async getUserWithAssignedLots(idUser: number): Promise<UserWithLot> {
    const userWithLot = this.api.getUserWithAssignedLots(idUser);
    return await lastValueFrom(userWithLot);
  }
}
