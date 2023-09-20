import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ClienteService} from "../../backend/services/cliente.service";
import {Cliente} from "../../backend/model/cliente";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog-crear-cliente',
  templateUrl: './dialog-crear-cliente.component.html',
  styleUrls: ['./dialog-crear-cliente.component.css']
})
export class DialogCrearClienteComponent {
  public nuevoCliente: Cliente = new Cliente();

  constructor(public dialogRef: MatDialogRef<DialogCrearClienteComponent>,
              private clienteService: ClienteService,
              private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  crearCliente(): void {
    this.clienteService.crearCliente(this.nuevoCliente)
      .subscribe({
        next: (response) => {
          this.nuevoCliente = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.snackBar.open(`El cliente ${this.nuevoCliente.nombre} fue creado con éxito`);
          this.dialogRef.close(this.nuevoCliente);
        },
      });
  }
}
