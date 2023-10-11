import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListadoComponent} from "./listado/listado.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listado', component: ListadoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
