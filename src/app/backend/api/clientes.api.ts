import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LoteParams} from "../model/lote";
import {Cliente, ClienteParams} from "../model/cliente";

@Injectable()
export class ClientesApi {
  private readonly apiController: string = 'clientes';

  constructor(private api: HttpService) {
  }

  getAllClientes() {
    return this.api.get(`${this.apiController}`);
  }

  crearCliente(cliente: Cliente) {
    return this.api.post(`${this.apiController}`, cliente);
  }

  getClientesFiltrados(params: ClienteParams) {
    return this.api.post(`${this.apiController}/filter`, params);
  }

}
