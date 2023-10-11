import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LotParams} from "../model/lot";
import {Client, ClientParams} from "../model/client";

@Injectable()
export class ClientesApi {
  private readonly apiController: string = 'clientes';

  constructor(private api: HttpService) {
  }

  getAllClientes() {
    return this.api.get(`${this.apiController}`);
  }

  crearCliente(cliente: Client) {
    return this.api.post(`${this.apiController}`, cliente);
  }

  eliminarCliente(idCliente: number) {
    return this.api.delete(`${this.apiController}/${idCliente}`);
  }
  getClientesFiltrados(params: ClientParams) {
    return this.api.post(`${this.apiController}/filter`, params);
  }

}
