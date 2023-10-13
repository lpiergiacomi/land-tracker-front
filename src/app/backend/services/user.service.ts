import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {User} from "../model/user";
import {UsersApi} from "../api/users.api";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: UsersApi) { }

  getAllUsersWithAssignedLots(): Observable<User[]> {
    return this.api.getAllUsersWithAssignedLots();
  }
}
