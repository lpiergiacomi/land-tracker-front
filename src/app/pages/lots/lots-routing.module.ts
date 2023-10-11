import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapRenderComponent} from "./map-render/map-render.component";
import {LotListComponent} from "./lot-list/lot-list.component";
import {LotsAssignmentComponent} from "./lots-assignment/lots-assignment.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'map', component: MapRenderComponent},
      { path: 'list', component: LotListComponent},
      { path: 'assignment', component: LotsAssignmentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotsRoutingModule { }
