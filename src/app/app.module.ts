import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MapRenderComponent } from './map-render/map-render.component';
import { LoteService } from './backend/services/lote.service';
import { LotesApi } from './backend/api/lotes.api';
import { HttpService } from './backend/api/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MapTooltipComponent } from './map-tooltip/map-tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MapRenderComponent,
    MapTooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    LoteService,
    LotesApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
