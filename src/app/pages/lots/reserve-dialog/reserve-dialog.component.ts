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

  ngOnInit() {
    this.newReserveForm = new FormGroup({
      client: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        this.clientValidator.bind(this)
      ])
    })
    this.getClients();
  }

  get client() {
    return this.newReserveForm.get('client');
  }


  onNoClick(): void {
    this.dialogReserve.close();
  }

  displayFn(client: any): string {
    return client?.name;
  }

  getClients() {
    this.client.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        filter((value) => {
          return value?.length > 2;
        }),
        tap(() => this.isLoading = true),
        switchMap((value) => {
          return this.clientService.getFilteredClients(new ClientParams(value)).pipe(
            delay(500),
            finalize(() => this.isLoading = false)
          );
        })
      )
      .subscribe((data) => {
        this.clients = data.content || [];
        this.isLoading = false;
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

  getErrorMessage() {
    if (this.client.hasError('required')) {
      return 'Debe ingresar un cliente';
    }
    if (this.client.hasError('invalidClient')) {
      return 'Debe seleccionar un cliente válido';
    }
    return this.client.hasError('minlength') ? 'Escriba al menos 3 letras' : '';
  }

  clientValidator(control: FormControl) {
    const client = control.value;
    if (!client || !client.id || client.id <= 0) {
      return {invalidClient: true};
    }
    return null;
  }

  reserve() {
    const reserve = new Reserve(this.lot.id, this.client.value.id);
    reserve.user = this.authService.getLoggedUser();
    this.createReserve(reserve)

  }

  createReserve(reserve: Reserve) {
    this.isLoading = true;
    this.reserveService.createReserve(reserve)
      .subscribe({
        error: (error) => {
          console.error(error);
          this.toastr.error(error?.error?.message);
          this.isLoading = false;
        },
        complete: () => {
          this.toastr.success(`Se reservó el lote correctamente`);
          this.isLoading = false;
          this.dialogReserve.close(reserve);
        },
      });
  }
}
