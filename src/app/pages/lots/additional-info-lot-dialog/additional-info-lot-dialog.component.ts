import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Lot} from "../../../backend/model/lot";
import {Payment} from "../../../backend/model/payment";
import {PaymentService} from "../../../backend/services/payment.service";

@Component({
  selector: 'app-additional-info-lot-dialog',
  templateUrl: './additional-info-lot-dialog.component.html',
  styleUrls: ['./additional-info-lot-dialog.component.css']
})
export class AdditionalInfoLotDialogComponent {

  constructor(
    public dialog: MatDialogRef<AdditionalInfoLotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public lot: Lot) {  }

  closeDialog() {
    this.dialog.close();
  }
}
