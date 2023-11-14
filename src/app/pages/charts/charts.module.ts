import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartLotsComponent } from './chart-lots/chart-lots.component';
import {PagesModule} from "../pages.module";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    ChartLotsComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    PagesModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class ChartsModule { }
