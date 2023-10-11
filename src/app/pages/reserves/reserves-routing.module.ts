import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReserveListComponent} from "./reserve-list/reserve-list.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: ReserveListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservesRoutingModule { }
