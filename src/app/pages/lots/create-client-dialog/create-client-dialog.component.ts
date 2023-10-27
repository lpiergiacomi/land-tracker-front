import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ClientService} from "../../../backend/services/client.service";
import {Client} from "../../../backend/model/client";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.css']
})
export class CreateClientDialogComponent implements OnInit {
  public newClient: Client = new Client();
  newClientForm!: FormGroup;
  isLoading = false;


  constructor(public dialogRef: MatDialogRef<CreateClientDialogComponent>,
              private clientService: ClientService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.newClientForm = new FormGroup({
      clientName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      clientDocument: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(8)
      ]),
      clientEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      clientPhone: new FormControl('', [
        Validators.required
      ]),
      clientAddress: new FormControl('', [
        Validators.required
      ])
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get clientName() {
    return this.newClientForm.get('clientName');
  }

  get clientDocument() {
    return this.newClientForm.get('clientDocument');
  }

  get clientEmail() {
    return this.newClientForm.get('clientEmail');
  }

  get clientPhone() {
    return this.newClientForm.get('clientPhone');
  }

  get clientAddress() {
    return this.newClientForm.get('clientAddress');
  }

  async createClient() {
    this.newClient.name = this.clientName.value;
    this.newClient.document = this.clientDocument.value;
    this.newClient.email = this.clientEmail.value;
    this.newClient.phone = this.clientPhone.value;
    this.newClient.address = this.clientAddress.value;

    this.isLoading = true;
    try {
      this.newClient = await this.clientService.createClient(this.newClient);
      this.toastr.success(`El cliente ${this.newClient.name} fue creado con éxito`);
      this.isLoading = false;
      this.dialogRef.close(this.newClient);
    } catch (error) {
      this.toastr.error(error?.error?.message);
      this.isLoading = false;
    }

  }

}
