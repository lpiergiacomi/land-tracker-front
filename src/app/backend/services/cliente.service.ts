import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ClientesApi} from "../api/clientes.api";
import {Cliente, ClienteParams} from "../model/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private api: ClientesApi) {
  }

  getClientes(): Observable<Cliente[]> {
    return this.api.getAllClientes();
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.api.crearCliente(cliente);
  }

  getClientesFiltrados(params: ClienteParams): Observable<any> {
    return this.api.getClientesFiltrados(params);
  }
}
