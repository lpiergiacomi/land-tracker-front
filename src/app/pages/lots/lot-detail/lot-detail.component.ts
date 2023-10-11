import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lot} from "../../../backend/model/lot";
import {MatDialog} from "@angular/material/dialog";
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";

@Component({
  selector: 'app-lot-detail',
  templateUrl: './lot-detail.component.html',
  styleUrls: ['./lot-detail.component.css']
})
export class LotDetailComponent {

  @Input() selectedLot: Lot;
  @Output() reservedLotEvent = new EventEmitter();

  constructor(public dialogReserve: MatDialog) {

  }

  reserve() {
    const dialogReserve = this.dialogReserve.open(ReserveDialogComponent, {
      data: this.selectedLot,
    });

    dialogReserve.afterClosed().subscribe(reserve => {
      if (reserve) {
        this.selectedLot.state = 'RESERVADO';
        this.reservedLotEvent.emit();
      }
    });
  }

  getColorState() {
    let color = '#7bb95dab';
    if (this.selectedLot.state == 'RESERVADO')
      color = '#ffed4887';
    if (this.selectedLot.state == 'VENDIDO')
      color = '#ff000096';
    return color;
  }
}
