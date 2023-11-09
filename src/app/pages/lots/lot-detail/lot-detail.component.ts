import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lot} from "../../../backend/model/lot";
import {MatDialog} from "@angular/material/dialog";
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";
import {AuthService} from "../../../backend/services/auth.service";
import {UserService} from "../../../backend/services/user.service";
import {LotService} from "../../../backend/services/lot.service";
import {AdditionalInfoLotDialogComponent} from "../additional-info-lot-dialog/additional-info-lot-dialog.component";
import {NewPaymentDialogComponent} from "../new-payment-dialog/new-payment-dialog.component";

@Component({
  selector: 'app-lot-detail',
  templateUrl: './lot-detail.component.html',
  styleUrls: ['./lot-detail.component.css']
})
export class LotDetailComponent implements OnInit{

  @Input() selectedLot: Lot;
  @Output() reservedLotEvent = new EventEmitter<Lot>();
  loggedUser: any;
  assignedLots: any[];

  constructor(private authService: AuthService,
              private userService: UserService,
              public lotService: LotService,
              public matDialog: MatDialog) {
    this.loggedUser = this.authService.getLoggedUser();
  }

  async ngOnInit(): Promise<void> {
    const userWithLot = await this.userService.getUserWithAssignedLots(this.loggedUser.id);
    this.assignedLots = userWithLot.assignedLotsIds;
  }

  reserve() {
    const dialogReserve = this.matDialog.open(ReserveDialogComponent, {
      data: this.selectedLot,
    });

    dialogReserve.afterClosed().subscribe(async reserve => {
      if (reserve) {
        this.reservedLotEvent.emit(await this.lotService.getLotById(this.selectedLot.id));
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

  openDialogMoreInfo() {
    this.matDialog.open(AdditionalInfoLotDialogComponent, {
      data: this.selectedLot,
      width: '60rem'
    });
  }

  canAddPayment() {
    return this.selectedLot?.canAddPayment(this.assignedLots);
  }

  addPayment() {
    const dialogNewPayment = this.matDialog.open(NewPaymentDialogComponent, {
      data: this.selectedLot,
      width: '30rem'
    });

    dialogNewPayment.afterClosed().subscribe(async payment => {
      if (payment) {
        this.reservedLotEvent.emit(await this.lotService.getLotById(this.selectedLot.id));
      }
    });
  }
}
