import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {MapRenderComponent} from './pages/map-render/map-render.component';

const routes: Routes = [

  {
    path: "mapa-de-lotes",
    component: MapRenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

