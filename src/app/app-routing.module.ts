import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapRenderComponent} from './pages/map-render/map-render.component';

const routes: Routes = [

  {
    path: "lotes",
    loadChildren: () => import('./pages/map-render/map-render.module').then(m => m.MapRenderModule) //TODO: Deberia ser LoteModule?
  },
    /* TODO
  {
    path: "clientes",
    loadChildren: () =>
  },
  {
    path: "reservas",
    loadChildren: () =>
  }
     */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

