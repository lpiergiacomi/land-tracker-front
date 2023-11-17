import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ChartsModule} from "../charts/charts.module";
import {MatGridListModule} from "@angular/material/grid-list";
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ChartsModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
  ]
})
export class DashboardModule { }
