import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Lot} from "../../../backend/model/lot";
import {ReserveService} from "../../../backend/services/reserve.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../backend/services/auth.service";

@Component({
  selector: 'app-reserve-details-dialog',
  templateUrl: './reserve-details-dialog.component.html',
  styleUrls: ['./reserve-details-dialog.component.css']
})
export class ReserveDetailsDialogComponent {
  isLoading = false;
  lotReserveDueDate: Date;

  constructor(
    private reserveService: ReserveService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<ReserveDetailsDialogComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public lot: Lot) {
  }


  onNoClick(): void {
    this.dialog.close();
  }

  async save() {
    this.isLoading = true;
    try {
      await this.reserveService.updateDueDate(this.lot.reserve.id, new Date(this.lotReserveDueDate), this.lot.id, this.authService.getLoggedUser().id);
      this.toastr.success(`Se modificó la fecha de vencimiento correctamente`);
      this.isLoading = false;
      this.dialog.close();
    } catch (error) {
      console.error(error);
      this.toastr.error(error?.error?.message);
      this.isLoading = false;
    }
  }

  changeDueDate($event: any) {
    this.lotReserveDueDate = $event;
  }
}
