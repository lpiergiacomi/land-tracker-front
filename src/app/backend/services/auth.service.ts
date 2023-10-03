import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {AuthApi} from "../api/auth.api";
import {Usuario} from "../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: AuthApi) { }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.api.getUsuarioById(id);
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.api.registrar(usuario);
  }
}
