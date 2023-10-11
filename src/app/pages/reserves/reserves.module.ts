import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservesRoutingModule } from './reserves-routing.module';
import { ReserveListComponent } from './reserve-list/reserve-list.component';


@NgModule({
  declarations: [
    ReserveListComponent
  ],
  imports: [
    CommonModule,
    ReservesRoutingModule
  ]
})
export class ReservesModule { }
