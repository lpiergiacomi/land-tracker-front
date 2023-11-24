import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: "home",
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: "lots",
      loadChildren: () => import('./lots/lots.module').then(m => m.LotsModule)
    },
    {
      path: "clients",
      loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
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
