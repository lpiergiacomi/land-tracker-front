import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../backend/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedUser: any;

  constructor(private authService: AuthService) {
    this.loggedUser = this.authService.getLoggedUser();
  }

  logout() {
    this.authService.logout();
  }
}
