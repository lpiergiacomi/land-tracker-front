import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoteService } from './backend/services/lote.service';
import { LotesApi } from './backend/api/lotes.api';
import { HttpService } from './backend/api/http.service';
import { HttpClientModule } from '@angular/common/http';
import {ClienteService} from "./backend/services/cliente.service";
import {ClientesApi} from "./backend/api/clientes.api";
import { BodyComponent } from './body/body.component';
import { SublevelMenuComponent } from './pages/menu/sublevel-menu.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    BodyComponent,
    SublevelMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpService,
    LoteService,
    LotesApi,
    ClienteService,
    ClientesApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
