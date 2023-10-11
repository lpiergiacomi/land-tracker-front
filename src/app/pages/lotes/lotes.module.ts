import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotesRoutingModule } from './lotes-routing.module';
import {BuscadorLotesComponent} from "./buscador-lotes/buscador-lotes.component";
import {DetalleLoteComponent} from "./detalle-lote/detalle-lote.component";
import {DialogCrearClienteComponent} from "./dialog-crear-cliente/dialog-crear-cliente.component";
import {DialogReservaComponent} from "./dialog-reserva/dialog-reserva.component";
import {LabelNroLoteComponent} from "./label-nro-lote/label-nro-lote.component";
import {MapRenderComponent} from "./map-render/map-render.component";
import {TooltipMapComponent} from "./tooltip-map/tooltip-map.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { ListadoComponent } from './listado/listado.component';
import {MatChipsModule} from "@angular/material/chips";
import {MetrosPipe} from "../../pipes/metros.pipe";
import {MetrosCuadradosPipe} from "../../pipes/metros-cuadrados.pipe";
import {LotsAssignmentComponent} from "./lots-assignment/lots-assignment.component";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    BuscadorLotesComponent,
    DetalleLoteComponent,
    DialogCrearClienteComponent,
    DialogReservaComponent,
    LabelNroLoteComponent,
    MapRenderComponent,
    TooltipMapComponent,
    ListadoComponent,
    MetrosPipe,
    MetrosCuadradosPipe,
    LotsAssignmentComponent
  ],
  imports: [
    CommonModule,
    LotesRoutingModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    TableModule
  ]
})
export class LotesModule { }
