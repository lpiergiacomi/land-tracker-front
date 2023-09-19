import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Lote} from "../../backend/model/lote";
import {FormControl} from "@angular/forms";
import {DialogCrearClienteComponent} from "../dialog-crear-cliente/dialog-crear-cliente.component";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {ClienteService} from "../../backend/services/cliente.service";
import {debounceTime, delay, filter, finalize, startWith, switchMap, tap} from "rxjs";
import {Cliente, ClienteParams} from "../../backend/model/cliente";

@Component({
  selector: 'app-dialog-reserva',
  templateUrl: './dialog-reserva.component.html',
  styleUrls: ['./dialog-reserva.component.css']
})
export class DialogReservaComponent implements OnInit{
  clientes: Cliente[] = [];
  clienteCtrl = new FormControl();
  isLoading = false;

  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  constructor(
    public dialogRef: MatDialogRef<DialogReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public lote: Lote,
    private crearClienteDialog: MatDialog,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.clienteCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        filter((value) => value.length > 2),
        tap(() => this.isLoading = true),
        switchMap((value) => this.clienteService.getClientesFiltrados(new ClienteParams(value)).pipe(
          delay(500),
          finalize(() => this.isLoading = false)
        ))      )
      .subscribe((data) => {
        this.clientes = data.content || [];
        this.isLoading = false;
      });
  }

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
        //this.clientes.push(nuevoCliente);
        this.clienteCtrl.setValue(nuevoCliente);
        this.autoTrigger.closePanel();

      }
    });
  }
}
