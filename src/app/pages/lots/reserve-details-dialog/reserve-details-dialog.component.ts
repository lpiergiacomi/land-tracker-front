import {Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Lot} from "../../../backend/model/lot";

@Component({
  selector: 'app-reserve-details-dialog',
  templateUrl: './reserve-details-dialog.component.html',
  styleUrls: ['./reserve-details-dialog.component.css']
})
export class ReserveDetailsDialogComponent {

  constructor(
    public dialog: MatDialogRef<ReserveDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public lot: Lot) {
  }


  onNoClick(): void {
    this.dialog.close();
  }

  closeDialog($event: any) {
    this.dialog.close();
  }
}
