import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Lote} from "../../backend/model/lote";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogCrearClienteComponent} from "../dialog-crear-cliente/dialog-crear-cliente.component";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {ClienteService} from "../../backend/services/cliente.service";
import {debounceTime, delay, filter, finalize, startWith, switchMap, tap} from "rxjs";
import {Cliente, ClienteParams} from "../../backend/model/cliente";

@Component({
    selector: 'app-dialog-reserva',
    templateUrl: './dialog-reserva.component.html',
    styleUrls: ['./dialog-reserva.component.css']
})
export class DialogReservaComponent implements OnInit {
    clientes: Cliente[] = [];
    isLoading = false;
    nuevaReservaForm!: FormGroup;

    @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

    constructor(
        public dialogRef: MatDialogRef<DialogReservaComponent>,
        @Inject(MAT_DIALOG_DATA) public lote: Lote,
        private crearClienteDialog: MatDialog,
        private clienteService: ClienteService
    ) {
    }

    ngOnInit() {
        this.nuevaReservaForm = new FormGroup({
            cliente: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                this.clienteValidator.bind(this)
            ])
        })
        this.getClientes();
    }

    get cliente() {
        return this.nuevaReservaForm.get('cliente');
    }


    onNoClick(): void {
        this.dialogRef.close();
    }

    displayFn(cliente: any): string {
        return cliente?.nombre;
    }

    getClientes() {
        this.cliente.valueChanges
            .pipe(
                startWith(''),
                debounceTime(300),
                filter((value) => {
                    return value?.length > 2;
                }),
                tap(() => this.isLoading = true),
                switchMap((value) => {
                    return this.clienteService.getClientesFiltrados(new ClienteParams(value)).pipe(
                        delay(500),
                        finalize(() => this.isLoading = false)
                    );
                })
            )
            .subscribe((data) => {
                this.clientes = data.content || [];
                this.isLoading = false;
            });
    }

    abrirDialogCreacionCliente() {
        const dialogCrearCliente = this.crearClienteDialog.open(DialogCrearClienteComponent);

        dialogCrearCliente.afterClosed().subscribe((nuevoCliente: Cliente) => {
            if (nuevoCliente) {
                this.clientes.push(nuevoCliente);
                this.cliente.setValue(nuevoCliente);
                this.autoTrigger.closePanel();

            }
        });
    }

    getErrorMessage() {
        if (this.cliente.hasError('required')) {
            return 'Debe ingresar un cliente';
        }
        if (this.cliente.hasError('invalidCliente')) {
            return 'Debe seleccionar un cliente válido';
        }
        return this.cliente.hasError('minlength') ? 'Escriba al menos 3 letras' : '';
    }

    clienteValidator(control: FormControl) {
        const cliente = control.value;
        if (!cliente || !cliente.id || cliente.id <= 0) {
            return {invalidCliente: true};
        }
        return null;
    }

    reservar() {
        console.log(this.cliente.value);
    }
}
