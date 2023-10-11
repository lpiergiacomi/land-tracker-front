import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ClientsApi} from "../api/clients-api.service";
import {Client, ClientParams} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private api: ClientsApi) {
  }

  getClients(): Observable<Client[]> {
    return this.api.getAllClients();
  }

  createClient(client: Client): Observable<Client> {
    return this.api.createClient(client);
  }

  deleteClient(idClient: number): any {
    return this.api.deleteClient(idClient);
  }
  getFilteredClients(params: ClientParams): Observable<any> {
    return this.api.getFilteredClients(params);
  }
}
