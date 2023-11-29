import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lot} from "../../../backend/model/lot";
import {ReserveService} from "../../../backend/services/reserve.service";
import {AuthService} from "../../../backend/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {LotService} from "../../../backend/services/lot.service";

@Component({
  selector: 'app-reserve-details',
  templateUrl: './reserve-details.component.html',
  styleUrls: ['./reserve-details.component.css']
})
export class ReserveDetailsComponent implements OnInit{
  @Input() lot: Lot;
  @Output() closeDialogEvent = new EventEmitter<Lot>();

  constructor(private reserveService: ReserveService,
              private lotService: LotService,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  lotReserveDueDate: Date;

  ngOnInit() {
    if (!this.lot.reserve) {
      this.toastr.error('No existe la reserva');
      this.closeDialogEvent.emit();
    }
    const utcDate = new Date(this.lot.reserve.dueDate);
    utcDate.setHours(utcDate.getHours() + 3);
    this.lotReserveDueDate = utcDate;
  }

  async saveReserve() {
    try {
      await this.reserveService.updateDueDate(this.lot.reserve.id, new Date(this.lotReserveDueDate), this.lot.id, this.authService.getLoggedUser().id);
      this.toastr.success(`Se modificó la fecha de vencimiento correctamente`);
      this.closeDialogEvent.emit();
    } catch (error) {
      console.error(error);
      this.toastr.error(error?.error?.message);
    }
  }

  async cancelReserve() {
    try {
      await this.reserveService.cancelReserve(this.lot.reserve.id, this.lot.id, this.authService.getLoggedUser().id);
      this.toastr.success(`Se canceló la reserva correctamente`);
      this.closeDialogEvent.emit(await this.lotService.getLotById(this.lot.id));
    } catch (error) {
      console.error(error);
      this.toastr.error(error?.error?.message);
    }
  }
}
