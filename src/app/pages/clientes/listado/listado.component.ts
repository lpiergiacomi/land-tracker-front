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
    let error = this.validarCliente(cliente);
    if (error !== ''){
      this.dataTable.editingRowKeys = {[cliente.id]:true};
      return this.toastr.error(error);
    }
    this.crearCliente(cliente);
    delete this.clientesClonados[cliente.id.toString()];
    return this.toastr.success(`Se editó el cliente correctamente`);
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
        },
      });
  }

  onRowDelete(cliente: any) {

    this.isLoading = true;
    this.clienteService.eliminarCliente(cliente.id)
      .subscribe({
        next: () => {
          delete this.clientesClonados[cliente.id.toString()];
          this.clientes = this.clientes.filter(c => c.id != cliente.id);
          this.toastr.success(`El cliente ${cliente.nombre} fue eliminado correctamente`);
        },
        error: (error) => {
          console.error(error);
          this.toastr.error(error.error.message);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  private validarCliente(cliente: Cliente) {
    var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (cliente.nombre.length < 3){
      return 'El nombre del cliente es inválido';
    }
    if (cliente.documento.toString().length < 7 || cliente.documento.toString().length > 8){
      return 'El documento del cliente es inválido';
    }
    if (cliente.email.length == 0 || !cliente.email.match(validRegexEmail)){
      return 'El email del cliente es inválido';
    }
    if (cliente.telefono.length == 0){
      return 'El teléfono del cliente es inválido';
    }
    return '';
  }
}
