import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoteService } from './backend/services/lote.service';
import { LotesApi } from './backend/api/lotes.api';
import { HttpService } from './backend/api/http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClienteService} from "./backend/services/cliente.service";
import {ClientesApi} from "./backend/api/clientes.api";
import {ReservaService} from "./backend/services/reserva.service";
import {ReservasApi} from "./backend/api/reservas.api";
import {ToastrModule} from "ngx-toastr";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthApi} from "./backend/api/auth.api";
import {AuthService} from "./backend/services/auth.service";
import {AuthModule} from "./auth/auth.module";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {JwtModule} from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    AuthModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      },
    }),
  ],
  providers: [
    HttpService,
    LoteService,
    LotesApi,
    ClienteService,
    ClientesApi,
    ReservaService,
    ReservasApi,
    AuthService,
    AuthApi,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
