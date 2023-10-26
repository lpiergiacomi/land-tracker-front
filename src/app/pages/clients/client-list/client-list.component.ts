import {Component, OnInit, ViewChild} from '@angular/core';
import { Client } from "../../../backend/model/client";
import { ClientService } from "../../../backend/services/client.service";
import { CreateClientDialogComponent } from "../../lots/create-client-dialog/create-client-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { Table } from 'primeng/table';

@Component({
  selector: 'app-client-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  @ViewChild(Table)
  private dataTable!: Table;

  clients!: Client[];
  clonedClients: { [s: string]: Client } = {};
  isLoading = false;
  rowToDelete: any = null;
  loadingRow: any = null;
  undoProgress: number = 0;
  undoProgressColor: string = 'primary';
  undoInterval;

  constructor(private clientService: ClientService,
              private createClientDialog: MatDialog,
              private toastr: ToastrService) {  }

  async ngOnInit() {
    await this.getClients();
  }

  async getClients() {
    this.clients = await this.clientService.getClients();
  }

  onRowEditInit(client: Client) {
    this.clonedClients[client.id.toString()] = { ...client };
  }

  async onRowEditSave(client: Client) {
    this.loadingRow = client;
    let error = this.validateClient(client);
    if (error !== ''){
      this.dataTable.editingRowKeys = {[client.id]:true};
      this.loadingRow = null;
      return this.toastr.error(error);
    }
    await this.createClient(client);
    delete this.clonedClients[client.id.toString()];
    return this.toastr.success(`El cliente ${client.name} fue editado correctamente`);
  }

  onRowEditCancel(client: Client, index: number) {
    this.clients[index] = this.clonedClients[client.id.toString()];
    delete this.clonedClients[client.id.toString()];
  }

  openDialogNewClient() {
    const dialogCreateClient = this.createClientDialog.open(CreateClientDialogComponent);
    dialogCreateClient.afterClosed().subscribe((newClient: Client) => {
      if (newClient) {
        this.clients.push(newClient);
      }
    });
  }

  async createClient(client: Client) {
    this.isLoading = true;
    await this.clientService.createClient(client);
    this.isLoading = false;
    this.loadingRow = null;
  }

  onRowDelete(client: any) {
    this.undoProgress = 0;
    this.rowToDelete = client;
    const totalTime = 5000;
    const intervalUpdateTime = 50;
    const progress = 100 / (totalTime / intervalUpdateTime);

    this.undoInterval = setInterval(async () => {
      this.undoProgress += progress;

      if (this.undoProgress >= 100) {
        clearInterval(this.undoInterval);
        await this.confirmDelete(client);
      }

      if (this.undoProgress <= 25) {
        this.undoProgressColor = 'primary';
      } else if (this.undoProgress <= 75) {
        this.undoProgressColor = 'accent';
      } else {
        this.undoProgressColor = 'warn';
      }
    }, intervalUpdateTime);
  }


  async confirmDelete(client: any) {
    if (this.rowToDelete === client) {
      try {
        await this.clientService.deleteClient(client.id);
        delete this.clonedClients[client.id.toString()];
        this.clients = this.clients.filter(c => c.id != client.id);
        this.toastr.success(`El cliente ${client.nombre} fue eliminado correctamente`);
        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.toastr.error(error.error.message);
        this.rowToDelete = null;
        this.undoProgress = 0;
      }
    }
  }


  confirmUndoDelete() {
    this.rowToDelete = null;
    this.undoProgress = 0;
    clearInterval(this.undoInterval);
  }

  private validateClient(client: Client) {

    if (client.name.length < 3){
      return 'El nombre del cliente es inválido';
    }
    if (client.document.toString().length < 7 || client.document.toString().length > 8){
      return 'El documento del cliente es inválido';
    }
    if (this.isInvalidEmail(client.email)){
      return 'El email del cliente es inválido';
    }
    if (client.phone.length == 0){
      return 'El teléfono del cliente es inválido';
    }
    return '';
  }

  isInvalidEmail(email: string): boolean {
    var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.length == 0 || !email.match(validRegexEmail)
  }
}
