import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Client, ClientParams} from "../model/client";

@Injectable()
export class ClientsApi {
  private readonly apiController: string = 'clients';

  constructor(private api: HttpService) {
  }

  getAllClients() {
    return this.api.get(`${this.apiController}`);
  }

  createClient(client: Client) {
    return this.api.post(`${this.apiController}`, client);
  }

  deleteClient(idClient: number) {
    return this.api.delete(`${this.apiController}/${idClient}`);
  }
  getFilteredClients(params: ClientParams) {
    return this.api.post(`${this.apiController}/filter`, params);
  }

}
