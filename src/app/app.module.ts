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
import { DetalleLoteComponent } from './detalle-lote/detalle-lote.component';
import { TooltipMapComponent } from './tooltip-map/tooltip-map.component';
import { LabelNroLoteComponent } from './label-nro-lote/label-nro-lote.component';
import { BuscadorLotesComponent } from './buscador-lotes/buscador-lotes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {NgFor} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

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
    MatButtonModule
  ],
  providers: [
    HttpService,
    LoteService,
    LotesApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
