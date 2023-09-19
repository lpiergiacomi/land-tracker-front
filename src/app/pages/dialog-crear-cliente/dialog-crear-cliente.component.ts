import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-crear-cliente',
  templateUrl: './dialog-crear-cliente.component.html',
  styleUrls: ['./dialog-crear-cliente.component.css']
})
export class DialogCrearClienteComponent {
  public nuevoCliente: any = { id: '', nombre: '' };

  constructor(public dialogRef: MatDialogRef<DialogCrearClienteComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
