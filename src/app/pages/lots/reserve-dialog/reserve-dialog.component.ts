import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Lot} from "../../../backend/model/lot";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateClientDialogComponent} from "../create-client-dialog/create-client-dialog.component";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {ClientService} from "../../../backend/services/client.service";
import {debounceTime, delay, filter, finalize, startWith, switchMap, tap} from "rxjs";
import {Client, ClientParams} from "../../../backend/model/client";
import {Reserve} from "../../../backend/model/reserve";
import {ReserveService} from "../../../backend/services/reserve.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../backend/services/auth.service";

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.css']
})
export class ReserveDialogComponent implements OnInit {
  clients: Client[] = [];
  isLoading = false;
  newReserveForm!: FormGroup;

  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  constructor(
    public dialogReserve: MatDialogRef<ReserveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public lot: Lot,
    private createClientDialog: MatDialog,
    private clientService: ClientService,
    private reserveService: ReserveService,
    public authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  async ngOnInit() {
    this.newReserveForm = new FormGroup({
      client: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        this.clientValidator.bind(this)
      ]),
      dueDate: new FormControl(new Date(), [
        Validators.required,
        this.dueDateValidator.bind(this)
      ])
    })
    await this.getClients();
  }

  get client() {
    return this.newReserveForm.get('client');
  }

  get dueDate() {
    return this.newReserveForm.get('dueDate');
  }
  onNoClick(): void {
    this.dialogReserve.close();
  }

  displayFn(client: any): string {
    return client?.name;
  }

  async getClients() {
    this.client.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        filter((value) => {
          return value?.length > 2;
        }),
        tap(() => this.isLoading = true),
      )
      .subscribe(async (value) => {
        try {
          const data = await this.clientService.getFilteredClients(new ClientParams(value));
          this.clients = data.content || [];
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      });
  }

  openCreateClientDialog() {
    const createClientDialog = this.createClientDialog.open(CreateClientDialogComponent);

    createClientDialog.afterClosed().subscribe((newClient: Client) => {
      if (newClient) {
        this.clients.push(newClient);
        this.client.setValue(newClient);
        this.autoTrigger.closePanel();

      }
    });
  }

  getClientErrorMessage() {
    if (this.client.hasError('required')) {
      return 'Debe ingresar un cliente';
    }
    if (this.client.hasError('invalidClient')) {
      return 'Debe seleccionar un cliente válido';
    }
    return this.client.hasError('minlength') ? 'Escriba al menos 3 letras' : '';
  }

  getDueDateErrorMessage() {
    if (this.dueDate.hasError('required')) {
      return 'Debe ingresar un vencimiento';
    }
    return this.dueDate.hasError('invalidDueDate') ? 'El vencimiento no puede ser anterior a hoy' : '';
  }

  clientValidator(control: FormControl) {
    const client = control.value;
    if (!client || !client.id || client.id <= 0) {
      return {invalidClient: true};
    }
    return null;
  }

  dueDateValidator(control: FormControl) {
    const dueDate = control.value;
    if (dueDate < new Date().setHours(0,0,0, 0)) {
      return {invalidDueDate: true};
    }
    return null;
  }

  async reserve() {
    const reserve = new Reserve(this.lot.id, this.client.value.id, this.dueDate.value);
    reserve.user = this.authService.getLoggedUser();
    await this.createReserve(reserve)

  }

  async createReserve(reserve: Reserve) {
    this.isLoading = true;
    try {
      await this.reserveService.createReserve(reserve);
      this.toastr.success(`Se reservó el lote correctamente`);
      this.isLoading = false;
      this.dialogReserve.close(reserve);
    } catch (error) {
      console.error(error);
      this.toastr.error(error?.error?.message);
      this.isLoading = false;
    }
  }
}
