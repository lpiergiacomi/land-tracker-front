import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ClienteService} from "../../../backend/services/cliente.service";
import {Cliente} from "../../../backend/model/cliente";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dialog-crear-cliente',
  templateUrl: './dialog-crear-cliente.component.html',
  styleUrls: ['./dialog-crear-cliente.component.css']
})
export class DialogCrearClienteComponent implements OnInit {
  public nuevoCliente: Cliente = new Cliente();
  nuevoClienteForm!: FormGroup;
  isLoading = false;


  constructor(public dialogRef: MatDialogRef<DialogCrearClienteComponent>,
              private clienteService: ClienteService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.nuevoClienteForm = new FormGroup({
      nombreCliente: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      dniCliente: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(8)
      ]),
      emailCliente: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      telefonoCliente: new FormControl('', [
        Validators.required
      ]),
      direccionCliente: new FormControl('', [
        Validators.required
      ])
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get nombreCliente() {
    return this.nuevoClienteForm.get('nombreCliente');
  }

  get dniCliente() {
    return this.nuevoClienteForm.get('dniCliente');
  }

  get emailCliente() {
    return this.nuevoClienteForm.get('emailCliente');
  }

  get telefonoCliente() {
    return this.nuevoClienteForm.get('telefonoCliente');
  }

  get direccionCliente() {
    return this.nuevoClienteForm.get('direccionCliente');
  }

  crearCliente(): void {
    this.nuevoCliente.nombre = this.nombreCliente.value;
    this.nuevoCliente.documento = this.dniCliente.value;
    this.nuevoCliente.email = this.emailCliente.value;
    this.nuevoCliente.telefono = this.telefonoCliente.value;
    this.nuevoCliente.direccion = this.direccionCliente.value;

    this.isLoading = true;
    this.clienteService.crearCliente(this.nuevoCliente)
      .subscribe({
        next: (response) => {
          this.nuevoCliente = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.toastr.success(`El cliente ${this.nuevoCliente.nombre} fue creado con éxito`);
          this.isLoading = false;
          this.dialogRef.close(this.nuevoCliente);

        },
      });
  }

}
