import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: "lotes",
      loadChildren: () => import('../pages/lotes/lotes.module').then(m => m.LotesModule)
    },
    {
      path: "clientes",
      loadChildren: () => import('../pages/clientes/clientes.module').then(m => m.ClientesModule)
    },
    {
      path: "reservas",
      loadChildren: () => import('../pages/reservas/reservas.module').then(m => m.ReservasModule)
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
