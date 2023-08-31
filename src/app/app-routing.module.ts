import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MapRenderComponent } from './map-render/map-render.component';
import { TestEventComponent } from './test-event/test-event.component';

const routes: Routes = [

    {
        path: "",
        component: AppComponent
      },
      {
        path: "model",
        component: MapRenderComponent
      },
      {
        path: "test",
        component: TestEventComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

