import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapRenderComponent} from "./map-render/map-render.component";
import {ListadoComponent} from "./listado/listado.component";
import {LotsAssignmentComponent} from "./lots-assignment/lots-assignment.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'mapa', component: MapRenderComponent},
      { path: 'listado', component: ListadoComponent},
      { path: 'asignacion', component: LotsAssignmentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotesRoutingModule { }
