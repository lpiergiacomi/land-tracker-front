import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Lote} from "../../backend/model/lote";
import {FormControl} from "@angular/forms";
import {DialogCrearClienteComponent} from "../dialog-crear-cliente/dialog-crear-cliente.component";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {ClienteService} from "../../backend/services/cliente.service";

@Component({
  selector: 'app-dialog-reserva',
  templateUrl: './dialog-reserva.component.html',
  styleUrls: ['./dialog-reserva.component.css']
})
export class DialogReservaComponent {
  clientes: any = [{id: 1, nombre: "Nahuel Pereyra"}, {id: 2, nombre: "Lucas Pier"}];
  clienteCtrl = new FormControl();
  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;


  constructor(
    public dialogRef: MatDialogRef<DialogReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public lote: Lote,
    private crearClienteDialog: MatDialog,
    private clienteService: ClienteService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayFn(cliente: any): string {
    return cliente?.nombre;
  }

  abrirDialogCreacionCliente() {
    const dialogRef = this.crearClienteDialog.open(DialogCrearClienteComponent);

    dialogRef.afterClosed().subscribe((nuevoCliente: { id: string, nombre: string }) => {
      if (nuevoCliente) {
        this.clientes.push(nuevoCliente);
        this.clienteCtrl.setValue(nuevoCliente);
        this.autoTrigger.closePanel();

      }
    });
  }
}
