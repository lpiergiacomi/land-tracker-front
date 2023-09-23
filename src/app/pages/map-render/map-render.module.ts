import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRenderRoutingModule } from './map-render-routing.module';
import {MapRenderComponent} from "./map-render.component";
import {BuscadorLotesComponent} from "../buscador-lotes/buscador-lotes.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {LabelNroLoteComponent} from "../label-nro-lote/label-nro-lote.component";
import {DetalleLoteComponent} from "../detalle-lote/detalle-lote.component";
import {TooltipMapComponent} from "../tooltip-map/tooltip-map.component";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
      MapRenderComponent,
      BuscadorLotesComponent,
      LabelNroLoteComponent,
      DetalleLoteComponent,
      TooltipMapComponent
  ],
  imports: [
    CommonModule,
    MapRenderRoutingModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
  ]
})
export class MapRenderModule { }
