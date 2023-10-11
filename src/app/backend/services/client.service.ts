import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ClientesApi} from "../api/clientes.api";
import {Client, ClientParams} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private api: ClientesApi) {
  }

  getClientes(): Observable<Client[]> {
    return this.api.getAllClientes();
  }

  crearCliente(cliente: Client): Observable<Client> {
    return this.api.crearCliente(cliente);
  }

  eliminarCliente(idCliente: number): any {
    return this.api.eliminarCliente(idCliente);
  }
  getClientesFiltrados(params: ClientParams): Observable<any> {
    return this.api.getClientesFiltrados(params);
  }
}
