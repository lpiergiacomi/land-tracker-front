import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {AuthApi} from "../api/auth.api";
import {User} from "../model/user";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: AuthApi, private router: Router, private jwtHelper: JwtHelperService) { }

  setLoggedUser(accessToken: any) {
    localStorage.setItem('access-token', accessToken);
    if (accessToken != '') {
      const decodedToken = this.jwtHelper.decodeToken(accessToken);
      localStorage.setItem('token_decoded', JSON.stringify(decodedToken));
    }
  }

  getLoggedUser(): User | null {
    const user = new User();
    user.id = parseInt(localStorage.getItem('user_id'));
    user.username = JSON.parse(localStorage.getItem('token_decoded'))?.sub;
    return user;
  }

  login(user: User): Observable<HttpResponse<void>> {
    return this.api.login(user);
  }

  registerUser(user: User): Observable<User> {
    return this.api.register(user);
  }

  logout() {
    localStorage.setItem('access-token', '');
    localStorage.setItem('token_decoded', '');
    localStorage.setItem('user_id', '');
    this.router.navigate(['/auth/login']);
  }
}
