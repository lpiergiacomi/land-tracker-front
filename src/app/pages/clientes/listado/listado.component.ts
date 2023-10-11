import {Component, OnInit, ViewChild} from '@angular/core';
import { Cliente } from "../../../backend/model/cliente";
import { ClienteService } from "../../../backend/services/cliente.service";
import { DialogCrearClienteComponent } from "../../lotes/dialog-crear-cliente/dialog-crear-cliente.component";
import { MatDialog } from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { Table } from 'primeng/table';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  @ViewChild(Table)
  private dataTable!: Table;

  clientes!: Cliente[];
  clientesClonados: { [s: string]: Cliente } = {};
  isLoading = false;
  rowAEliminar: any = null;
  rowCargando: any = null;
  progresoDeshacer: number = 0;
  colorProgressDeshacer: string = 'primary';
  intervalDeshacer;

  constructor(private clienteService: ClienteService,
              private crearClienteDialog: MatDialog,
              private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getClientes().subscribe({
      next: (response) => {
        this.clientes = response as Cliente[];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  onRowEditInit(cliente: Cliente) {
    this.clientesClonados[cliente.id.toString()] = { ...cliente };
  }

  onRowEditSave(cliente: Cliente) {
    this.rowCargando = cliente;
    let error = this.validarCliente(cliente);
    if (error !== ''){
      this.dataTable.editingRowKeys = {[cliente.id]:true};
      this.rowCargando = null;
      return this.toastr.error(error);
    }
    this.crearCliente(cliente);
    delete this.clientesClonados[cliente.id.toString()];
    return this.toastr.success(`El cliente ${cliente.nombre} fue editado correctamente`);
  }

  onRowEditCancel(cliente: Cliente, index: number) {
    this.clientes[index] = this.clientesClonados[cliente.id.toString()];
    delete this.clientesClonados[cliente.id.toString()];
  }

  abrirDialogCreacionCliente() {
    const dialogCrearCliente = this.crearClienteDialog.open(DialogCrearClienteComponent);
    dialogCrearCliente.afterClosed().subscribe((nuevoCliente: Cliente) => {
      if (nuevoCliente) {
        this.clientes.push(nuevoCliente);
      }
    });
  }

  crearCliente(cliente: Cliente) {
    this.isLoading = true;
    this.clienteService.crearCliente(cliente)
      .subscribe({
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
          this.rowCargando = null;
        },
      });
  }

  onRowDelete(cliente: any) {
    this.progresoDeshacer = 0;
    this.rowAEliminar = cliente;
    const duracionTotal = 5000;
    const tiempoActualizacionIntervalo = 50;
    const progreso = 100 / (duracionTotal / tiempoActualizacionIntervalo);

    this.intervalDeshacer = setInterval(() => {
      this.progresoDeshacer += progreso;

      if (this.progresoDeshacer >= 100) {
        clearInterval(this.intervalDeshacer);
        this.confirmDelete(cliente);
      }

      if (this.progresoDeshacer <= 25) {
        this.colorProgressDeshacer = 'primary';
      } else if (this.progresoDeshacer <= 75) {
        this.colorProgressDeshacer = 'accent';
      } else {
        this.colorProgressDeshacer = 'warn';
      }
    }, tiempoActualizacionIntervalo);
  }


  confirmDelete(cliente: any) {
    if (this.rowAEliminar === cliente) {
      this.clienteService.eliminarCliente(cliente.id).subscribe({
        next: () => {
          delete this.clientesClonados[cliente.id.toString()];
          this.clientes = this.clientes.filter(c => c.id != cliente.id);
          this.toastr.success(`El cliente ${cliente.nombre} fue eliminado correctamente`);
        },
        error: (error) => {
          console.error(error);
          this.toastr.error(error.error.message);
          this.rowAEliminar = null;
          this.progresoDeshacer = 0;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }


  confirmUndoDelete() {
    this.rowAEliminar = null;
    this.progresoDeshacer = 0;
    clearInterval(this.intervalDeshacer);
  }

  private validarCliente(cliente: Cliente) {

    if (cliente.nombre.length < 3){
      return 'El nombre del cliente es inválido';
    }
    if (cliente.documento.toString().length < 7 || cliente.documento.toString().length > 8){
      return 'El documento del cliente es inválido';
    }
    if (this.isInvalidEmail(cliente.email)){
      return 'El email del cliente es inválido';
    }
    if (cliente.telefono.length == 0){
      return 'El teléfono del cliente es inválido';
    }
    return '';
  }

  isInvalidEmail(email: string): boolean {
    var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.length == 0 || !email.match(validRegexEmail)
  }
}
