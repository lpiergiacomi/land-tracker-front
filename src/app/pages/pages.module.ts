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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {CdkMenuModule} from "@angular/cdk/menu";
import { CalendarComponent } from './calendar/calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";

@NgModule({
  declarations: [
    PagesComponent,
    BodyComponent,
    HeaderComponent,
    MenuComponent,
    SublevelMenuComponent,
    PageNotFoundComponent,
    CalendarComponent
  ],
  exports: [
    CalendarComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        CdkMenuModule,
        OverlayModule,
        FullCalendarModule
    ]
})
export class PagesModule { }
