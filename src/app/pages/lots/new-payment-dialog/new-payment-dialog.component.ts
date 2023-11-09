import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Lot} from "../../../backend/model/lot";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../backend/services/auth.service";
import {PaymentService} from "../../../backend/services/payment.service";
import {Payment} from "../../../backend/model/payment";

@Component({
  selector: 'app-new-payment-dialog',
  templateUrl: './new-payment-dialog.component.html',
  styleUrls: ['./new-payment-dialog.component.css']
})
export class NewPaymentDialogComponent implements OnInit {
  isLoading = false;
  newPaymentForm!: FormGroup;

  currentFile?: File;
  fileName: string = 'Seleccionar';
  reasons: string[] = ['Adelanto', 'Reserva', 'Cuota', 'Otro'];

  constructor(
    public dialogNewPayment: MatDialogRef<NewPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public lot: Lot,
    private paymentService: PaymentService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.newPaymentForm = new FormGroup({
      amount: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.getBalance())
      ]),
      reason: new FormControl('', [
        Validators.required
      ])
    })
  }

  get amount() {
    return this.newPaymentForm.get('amount');
  }

  get reason() {
    return this.newPaymentForm.get('reason');
  }

  onNoClick(): void {
    this.dialogNewPayment.close();
  }


  async addPayment() {
    if (!this.currentFile || this.currentFile?.size <= 2000000) {
      const user = this.authService.getLoggedUser();
      const payment = new Payment(this.lot.id, this.amount.value, this.currentFile, user.id, this.reason.value);
      await this.createPayment(payment)
    }
    else {
      this.toastr.error(`El archivo supera los 2MB`);
    }
  }

  async createPayment(payment: Payment) {
    this.isLoading = true;
    try {
      await this.paymentService.createPayment(payment);
      this.toastr.success(`Se agregó el pago correctamente`);
      this.isLoading = false;
      this.dialogNewPayment.close(payment);
    } catch (error) {
      console.error(error);
      this.toastr.error(error?.error?.message ?? 'Ocurrió un error');
      this.isLoading = false;
    }
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Seleccionar';
    }
  }

  getBalance() {
    return this.lot.price - this.getTotalPaymentsAmount();
  }

  getTotalPaymentsAmount() {
    return this.lot.payments.reduce((total, payment) => total + payment.amount, 0);
  }
}
