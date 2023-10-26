import {Injectable} from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {ClientsApi} from "../api/clients-api.service";
import {Client, ClientParams} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private api: ClientsApi) {
  }

  async getClients(){
    return await lastValueFrom(this.api.getAllClients());
  }

  async createClient(client: Client){
    return await lastValueFrom(this.api.createClient(client));
  }

  async deleteClient(idClient: number) {
    return await lastValueFrom(this.api.deleteClient(idClient));
  }

  async getFilteredClients(params: ClientParams) {
    return await lastValueFrom(this.api.getFilteredClients(params));
  }
}
