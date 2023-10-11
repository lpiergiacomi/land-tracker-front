import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapRenderComponent} from "./map-render/map-render.component";
import {ListadoComponent} from "./listado/listado.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'mapa', component: MapRenderComponent},
      { path: 'listado', component: ListadoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotesRoutingModule { }
