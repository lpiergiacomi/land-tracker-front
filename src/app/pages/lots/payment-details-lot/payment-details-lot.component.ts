import {Component, Input} from '@angular/core';
import {Payment} from "../../../backend/model/payment";
import {FileUploadService} from "../../../backend/services/file-upload.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-payment-details-lot',
  templateUrl: './payment-details-lot.component.html',
  styleUrls: ['./payment-details-lot.component.css']
})
export class PaymentDetailsLotComponent {
  @Input() payment: Payment;

  constructor(private fileUploadService: FileUploadService,
              private toastr: ToastrService) {
  }

  async downloadFile() {
    try {
      const resultBlob = await this.fileUploadService.getFileById(this.payment.file['id']);
      const downloadURL = URL.createObjectURL(new Blob([resultBlob], {type: this.payment.file.type}));
      window.open(downloadURL);
    } catch (error) {
      this.toastr.error(error);
    }

  }


}
