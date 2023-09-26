import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from "../../../backend/model/cliente";
import { ClienteService } from "../../../backend/services/cliente.service";
import { DialogCrearClienteComponent } from "../../lotes/dialog-crear-cliente/dialog-crear-cliente.component";
import { MatDialog } from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['nombre', 'documento', 'email', 'telefono', 'direccion'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clienteService: ClienteService, private crearClienteDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getClientes().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response as Cliente[]);
      },
      complete: () => {
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  abrirDialogCreacionCliente() {
    const dialogCrearCliente = this.crearClienteDialog.open(DialogCrearClienteComponent);

    dialogCrearCliente.afterClosed().subscribe((nuevoCliente: Cliente) => {

      if (nuevoCliente) {
        this.dataSource.data.push(nuevoCliente);
        this.dataSource.data = this.dataSource.data;
      }

    });
  }
}
