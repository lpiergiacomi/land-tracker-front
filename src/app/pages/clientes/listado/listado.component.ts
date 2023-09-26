import {Component, OnInit, ViewChild} from '@angular/core';
import {Cliente } from "../../../backend/model/cliente";
import {ClienteService} from "../../../backend/services/cliente.service";
import {DialogCrearClienteComponent} from "../../lotes/dialog-crear-cliente/dialog-crear-cliente.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['nombre', 'dni', 'email', 'telefono', 'direccion'];
  @ViewChild(MatTable) table: MatTable<Cliente>;

  constructor(private clienteService: ClienteService, private crearClienteDialog: MatDialog) {
  }

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

  test() {
    const dialogCrearCliente = this.crearClienteDialog.open(DialogCrearClienteComponent);

    dialogCrearCliente.afterClosed().subscribe((nuevoCliente: Cliente) => {
      if (nuevoCliente) {
        console.log(nuevoCliente);
        this.clientes.push(nuevoCliente);
        this.table.renderRows();
      }
    });
  }
}
