import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {MapRenderComponent} from './map-render/map-render.component';
import {DetalleLoteComponent} from "./detalle-lote/detalle-lote.component";

const routes: Routes = [

  {
    path: "",
    component: AppComponent
  },
  {
    path: "mapa-de-lotes",
    component: MapRenderComponent
  },
  {
    path: "detalle-lote/:id",
    component: DetalleLoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

