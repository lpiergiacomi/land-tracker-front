import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MapRenderComponent } from './pages/map-render/map-render.component';
import { LoteService } from './backend/services/lote.service';
import { LotesApi } from './backend/api/lotes.api';
import { HttpService } from './backend/api/http.service';
import { HttpClientModule } from '@angular/common/http';
import { DetalleLoteComponent } from './pages/detalle-lote/detalle-lote.component';
import { TooltipMapComponent } from './pages/tooltip-map/tooltip-map.component';
import { LabelNroLoteComponent } from './pages/label-nro-lote/label-nro-lote.component';
import { BuscadorLotesComponent } from './pages/buscador-lotes/buscador-lotes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {NgFor} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import { DialogReservaComponent } from './pages/dialog-reserva/dialog-reserva.component';
import { MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { DialogCrearClienteComponent } from './pages/dialog-crear-cliente/dialog-crear-cliente.component';
import {ClienteService} from "./backend/services/cliente.service";
import {ClientesApi} from "./backend/api/clientes.api";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatMenuModule} from "@angular/material/menu";
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MapRenderComponent,
    DetalleLoteComponent,
    TooltipMapComponent,
    LabelNroLoteComponent,
    BuscadorLotesComponent,
    DialogReservaComponent,
    DialogCrearClienteComponent,
    BodyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgFor,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
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
