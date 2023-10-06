import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../backend/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userInfo: any;

  constructor(private authService: AuthService) {
    this.userInfo = this.authService.getLoggedUser();
  }

  logout() {
    this.authService.logout();
  }
}
