import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {TableModule} from "primeng/table";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    ClientListComponent
  ],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        MatButtonModule,
        MatDialogModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatIconModule,
        TableModule,
        FormsModule,
        ChipsModule,
        DropdownModule,
        ButtonModule,
        RippleModule,
        MatProgressSpinnerModule,
        MatProgressBarModule
    ]
})
export class ClientsModule { }
