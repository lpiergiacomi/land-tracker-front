import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [

  {
    path: "lotes",
    loadChildren: () => import('./pages/lotes/lotes.module').then(m => m.LotesModule)
  },
  {
    path: "clientes",
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: "reservas",
    loadChildren: () => import('./pages/reservas/reservas.module').then(m => m.ReservasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

