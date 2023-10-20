import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotsRoutingModule } from './lots-routing.module';
import {MapLotSearcherComponent} from "./map-lot-searcher/map-lot-searcher.component";
import {LotDetailComponent} from "./lot-detail/lot-detail.component";
import {CreateClientDialogComponent} from "./create-client-dialog/create-client-dialog.component";
import {ReserveDialogComponent} from "./reserve-dialog/reserve-dialog.component";
import {LabelLotNumber} from "./label-lot-number/label-lot-number.component";
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
import { LotListComponent } from './lot-list/lot-list.component';
import {MatChipsModule} from "@angular/material/chips";
import {MetersPipe} from "../../pipes/meters.pipe";
import {SquareMetersPipe} from "../../pipes/metros-cuadrados.pipe";
import {LotsAssignmentComponent} from "./lots-assignment/lots-assignment.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    MapLotSearcherComponent,
    LotDetailComponent,
    CreateClientDialogComponent,
    ReserveDialogComponent,
    LabelLotNumber,
    MapRenderComponent,
    TooltipMapComponent,
    LotListComponent,
    MetersPipe,
    SquareMetersPipe,
    LotsAssignmentComponent
  ],
  imports: [
    CommonModule,
    LotsRoutingModule,
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
    TableModule,
    InputTextModule,
    MatIconModule
  ]
})
export class LotsModule { }
