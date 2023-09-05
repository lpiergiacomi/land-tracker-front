import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { MapRenderComponent } from './map-render/map-render.component';
import { LoteService } from './backend/services/lote.service';
import { LotesApi } from './backend/api/lotes.api';
import { HttpService } from './backend/api/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    SettingsComponent,
    MapRenderComponent
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
