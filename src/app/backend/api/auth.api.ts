import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Usuario} from "../model/usuario";

@Injectable()
export class AuthApi {
  private readonly apiController: string = 'auth';

  constructor(private api: HttpService) {}

  getUsuarioById(id: number) {
    return this.api.get(`${this.apiController}/${id}`);
  }

  registrar(usuario: Usuario) {
    return this.api.post(`${this.apiController}`, usuario);
  }
}
