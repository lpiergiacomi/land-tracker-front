import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapRenderComponent} from "./map-render.component";

const routes: Routes = [
  {
    path: 'mapa',
    component: MapRenderComponent
  },
  {
    path: 'lista',
    component: MapRenderComponent // TODO
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRenderRoutingModule { }
