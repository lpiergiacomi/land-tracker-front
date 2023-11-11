import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LotsRoutingModule} from './lots-routing.module';
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
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {LotListComponent} from './lot-list/lot-list.component';
import {MatChipsModule} from "@angular/material/chips";
import {MetersPipe} from "../../pipes/meters.pipe";
import {SquareMetersPipe} from "../../pipes/squate-meters.pipe";
import {LotsAssignmentComponent} from "./lots-assignment/lots-assignment.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { AdditionalInfoLotDialogComponent } from './additional-info-lot-dialog/additional-info-lot-dialog.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ReserveStatePipe} from "../../pipes/reserve-state.pipe";
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormatFilleSizePipe} from "../../pipes/format-fille-size.pipe";
import { NewPaymentDialogComponent } from './new-payment-dialog/new-payment-dialog.component';
import {PaymentDetailsLotComponent} from "./payment-details-lot/payment-details-lot.component";


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
    ReserveStatePipe,
    LotsAssignmentComponent,
    AdditionalInfoLotDialogComponent,
    UploadFilesComponent,
    FormatFilleSizePipe,
    NewPaymentDialogComponent,
    PaymentDetailsLotComponent
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
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    TableModule,
    InputTextModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
  ]
})
export class LotsModule {
}
