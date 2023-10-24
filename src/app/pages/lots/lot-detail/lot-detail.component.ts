import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lot} from "../../../backend/model/lot";
import {MatDialog} from "@angular/material/dialog";
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";
import {AuthService} from "../../../backend/services/auth.service";
import {UserService} from "../../../backend/services/user.service";

@Component({
  selector: 'app-lot-detail',
  templateUrl: './lot-detail.component.html',
  styleUrls: ['./lot-detail.component.css']
})
export class LotDetailComponent implements OnInit{

  @Input() selectedLot: Lot;
  @Output() reservedLotEvent = new EventEmitter();
  loggedUser: any;
  assignedLots: any[];

  constructor(private authService: AuthService,
              private userService: UserService,
              public dialogReserve: MatDialog) {
    this.loggedUser = this.authService.getLoggedUser();
  }

  async ngOnInit(): Promise<void> {
    const userWithLot = await this.userService.getUserWithAssignedLots(this.loggedUser.id);
    this.assignedLots = userWithLot.assignedLotsIds;
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
    if (this.selectedLot?.state == 'RESERVADO')
      color = '#ffed4887';
    if (this.selectedLot?.state == 'VENDIDO')
      color = '#ff000096';
    return color;
  }

  canReserve() {
    return this.selectedLot?.canReserve(this.assignedLots);
  }

  hasAssigned() {
    return this.selectedLot?.hasAssigned(this.assignedLots);
  }

  isAvailable() {
    return this.selectedLot?.isAvailable();
  }
}
