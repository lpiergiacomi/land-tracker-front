import { Injectable } from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {UsersApi} from "../api/users.api";
import {UserWithLot} from "../model/user-with-lot";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: UsersApi) { }

  async getAllUsersWithAssignedLots() {
    return await lastValueFrom(this.api.getAllUsersWithAssignedLots());
  }
  async getUserWithAssignedLots(idUser: number) {
    return await lastValueFrom(this.api.getUserWithAssignedLots(idUser));
  }
}
