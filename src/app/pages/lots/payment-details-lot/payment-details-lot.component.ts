import {Component, Input} from '@angular/core';
import {Payment} from "../../../backend/model/payment";
import {FileUploadService} from "../../../backend/services/file-upload.service";
import {ToastrService} from "ngx-toastr";
import {Lot} from "../../../backend/model/lot";

@Component({
  selector: 'app-payment-details-lot',
  templateUrl: './payment-details-lot.component.html',
  styleUrls: ['./payment-details-lot.component.css']
})
export class PaymentDetailsLotComponent {
  @Input() lot: Lot;
  constructor(private fileUploadService: FileUploadService,
              private toastr: ToastrService) {
  }

  async downloadFile(payment: Payment) {
    try {
      const resultBlob = await this.fileUploadService.getFileById(payment.file['id']);
      const downloadURL = URL.createObjectURL(new Blob([resultBlob], {type: payment.file.type}));
      window.open(downloadURL);
    } catch (error) {
      this.toastr.error(error);
    }

  }

  getBalance() {
    return this.lot.price - this.getTotalPaymentsAmount();
  }

  getTotalPaymentsAmount() {
    return this.lot.payments.reduce((total, payment) => total + payment.amount, 0);
  }
}
