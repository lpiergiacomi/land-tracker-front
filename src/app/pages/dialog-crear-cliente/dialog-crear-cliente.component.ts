import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ClienteService} from "../../backend/services/cliente.service";
import {Cliente} from "../../backend/model/cliente";
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
      ])
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get nombreCliente() {
    return this.nuevoClienteForm.get('nombreCliente');
  }

  crearCliente(): void {
    this.nuevoCliente.nombre = this.nombreCliente.value;
    this.isLoading = true;
    this.clienteService.crearCliente(this.nuevoCliente)
      .subscribe({
        next: (response) => {
          console.log(response)
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

  getErrorMessage() {
    if (this.nombreCliente.hasError('required')) {
      return 'Debe ingresar un cliente';
    }
    return this.nombreCliente.hasError('minlength') ? 'Escriba al menos 3 letras' : '';
  }
}
