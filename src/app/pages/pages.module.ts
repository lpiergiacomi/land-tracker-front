import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import {PagesComponent} from "./pages.component";
import {BodyComponent} from "./body/body.component";
import {HeaderComponent} from "./header/header.component";
import {MenuComponent} from "./menu/menu.component";
import {SublevelMenuComponent} from "./menu/sublevel-menu.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    PagesComponent,
    BodyComponent,
    HeaderComponent,
    MenuComponent,
    SublevelMenuComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PagesModule { }
