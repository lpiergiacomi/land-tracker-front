import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: "lots",
      loadChildren: () => import('./lots/lots.module').then(m => m.LotsModule)
    },
    {
      path: "clients",
      loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
    },
    {
      path: "reserves",
      loadChildren: () => import('./reserves/reserves.module').then(m => m.ReservesModule)
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
