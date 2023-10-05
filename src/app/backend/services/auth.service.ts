import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {AuthApi} from "../api/auth.api";
import {Usuario} from "../model/usuario";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser: Usuario | null = null;

  constructor(private api: AuthApi) { }

  setLoggedUser(decodedToken: any) {
    this.loggedUser = new Usuario();
    this.loggedUser.username = decodedToken.sub;
  }

  getLoggedUser(): Usuario | null {
    return this.loggedUser;
  }

  login(usuario: Usuario): Observable<HttpResponse<void>> {
    return this.api.login(usuario);
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.api.registrar(usuario);
  }
}
