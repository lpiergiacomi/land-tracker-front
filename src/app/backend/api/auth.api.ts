import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import { Usuario} from "../model/usuario";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class AuthApi {
  private readonly apiController: string = 'auth';

  constructor(private api: HttpService) {}

  login(usuario: Usuario): Observable<HttpResponse<void>> {
    return this.api.post(`${this.apiController}/login`, usuario, {observe: 'response'});
  }

  registrar(usuario: Usuario) {
    return this.api.post(`${this.apiController}/register`, usuario);
  }
}
