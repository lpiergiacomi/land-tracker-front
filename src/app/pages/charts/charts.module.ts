import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartLotsComponent } from './chart-lots/chart-lots.component';
import {PagesModule} from "../pages.module";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {PieChartComponent} from "./pie-chart/pie-chart.component";


@NgModule({
  declarations: [
    ChartLotsComponent,
    PieChartComponent
  ],
  exports: [
    ChartLotsComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class ChartsModule { }
