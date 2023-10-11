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
  private loggedUser: any;

  constructor(private api: AuthApi, private router: Router, private jwtHelper: JwtHelperService) { }

  setLoggedUser(user: any) {
    localStorage.setItem('access-token', user);
    if (user != '') {
      const decodedToken = this.jwtHelper.decodeToken(user);
      localStorage.setItem('token_decoded', JSON.stringify(decodedToken));
      this.loggedUser = decodedToken;
    }
  }

  getLoggedUser(): User | null {
    const user = new User();
    user.username = JSON.parse(localStorage.getItem('token_decoded')).sub;
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
    this.router.navigate(['/auth/login']);
  }
}
