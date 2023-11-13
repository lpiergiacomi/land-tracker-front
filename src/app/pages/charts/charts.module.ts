import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartLotsComponent } from './chart-lots/chart-lots.component';
import {PagesModule} from "../pages.module";


@NgModule({
  declarations: [
    ChartLotsComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    PagesModule
  ]
})
export class ChartsModule { }
