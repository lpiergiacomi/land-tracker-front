import {Component, OnInit } from '@angular/core';
import {navbarData} from "./nav-data";
import {IMenuData} from "./helper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  navData = navbarData;
  multiple: boolean = false;

  constructor(private router: Router) {
  }

  handleClick(item: IMenuData){
    if (!this.multiple){
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  async goToDashboard() {
    await this.router.navigate(['/pages/home/dashboard']);
  }
}
