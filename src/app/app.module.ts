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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {ClienteService} from "./backend/services/cliente.service";
import {ClientesApi} from "./backend/api/clientes.api";
import {ToastrModule} from "ngx-toastr";
import {ReservaService} from "./backend/services/reserva.service";
import {ReservasApi} from "./backend/api/reservas.api";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    HttpService,
    LoteService,
    LotesApi,
    ClienteService,
    ClientesApi,
    ReservaService,
    ReservasApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
