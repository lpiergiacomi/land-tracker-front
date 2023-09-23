import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ClienteService} from "../../../backend/services/cliente.service";
import {Cliente} from "../../../backend/model/cliente";

@Component({
  selector: 'app-dialog-crear-cliente',
  templateUrl: './dialog-crear-cliente.component.html',
  styleUrls: ['./dialog-crear-cliente.component.css']
})
export class DialogCrearClienteComponent {
  public nuevoCliente: Cliente = new Cliente();

  constructor(public dialogRef: MatDialogRef<DialogCrearClienteComponent>,
              private clienteService: ClienteService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  crearCliente(): void {
    this.clienteService.crearCliente(this.nuevoCliente)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          // Cierra el diálogo y pasa los datos del nuevo cliente de vuelta
          this.dialogRef.close(this.nuevoCliente);
        },
      });
  }
}
