import {Component, OnInit } from '@angular/core';
import {navbarData} from "./nav-data";
import {IMenuData} from "./helper";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  navData = navbarData;
  multiple: boolean = false;

  ngOnInit() {
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
}
