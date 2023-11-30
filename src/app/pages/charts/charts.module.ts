import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PagesModule} from "../pages.module";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import { ChartPaymentsComponent } from './chart-payments/chart-payments.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';


@NgModule({
  declarations: [
    ChartPaymentsComponent,
    BarChartComponent
  ],
  exports: [
    ChartPaymentsComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class ChartsModule { }
