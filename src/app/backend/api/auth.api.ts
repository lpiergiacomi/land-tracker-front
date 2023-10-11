import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import { User} from "../model/user";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class AuthApi {
  private readonly apiController: string = 'auth';

  constructor(private api: HttpService) {}

  login(user: User): Observable<HttpResponse<void>> {
    return this.api.post(`${this.apiController}/login`, user, {observe: 'response'});
  }

  register(user: User) {
    return this.api.post(`${this.apiController}/register`, user);
  }
}
