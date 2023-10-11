import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LotService } from './backend/services/lot.service';
import { LotsApi } from './backend/api/lots-api.service';
import { HttpService } from './backend/api/http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClientService} from "./backend/services/client.service";
import {ClientsApi} from "./backend/api/clients-api.service";
import {ReserveService} from "./backend/services/reserve.service";
import {ReservesApi} from "./backend/api/reserves-api.service";
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
    LotService,
    LotsApi,
    ClientService,
    ClientsApi,
    ReserveService,
    ReservesApi,
    AuthService,
    AuthApi,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
