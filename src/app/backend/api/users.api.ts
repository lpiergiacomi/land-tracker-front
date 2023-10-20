import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class UsersApi {
  private readonly apiController: string = 'users';

  constructor(private api: HttpService) {}

  getAllUsersWithAssignedLots() {
    return this.api.get(`${this.apiController}/with-assigned-lots`);
  }

  getUserWithAssignedLots(idUser: number) {
    return this.api.get(`${this.apiController}/${idUser}/with-assigned-lots`);
  }
}
