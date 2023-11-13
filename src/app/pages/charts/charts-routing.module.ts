import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChartLotsComponent} from "./chart-lots/chart-lots.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lots', component: ChartLotsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
