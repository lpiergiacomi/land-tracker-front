import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotDetailComponent } from './lot-detail.component';
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {of} from "rxjs";
import {AuthApi} from "../../../backend/api/auth.api";
import {AuthService} from "../../../backend/services/auth.service";
import {HttpService} from "../../../backend/api/http.service";
import {HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {UsersApi} from "../../../backend/api/users.api";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MetersPipe} from "../../../pipes/meters.pipe";
import {SquareMetersPipe} from "../../../pipes/squate-meters.pipe";
import {Lot} from "../../../backend/model/lot";
import {ClientsApi} from "../../../backend/api/clients-api.service";
import {ReservesApi} from "../../../backend/api/reserves-api.service";
import {ToastrModule} from "ngx-toastr";
import { ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {LotsApi} from "../../../backend/api/lots-api.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

describe('LotDetailComponent', () => {
  let component: LotDetailComponent;
  let fixture: ComponentFixture<LotDetailComponent>;
  let dialog: MatDialog;
  let fixtureReserve: ComponentFixture<ReserveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LotDetailComponent,
        ReserveDialogComponent,
        MetersPipe,
        SquareMetersPipe,
      ],
      imports: [
        MatDialogModule,
        HttpClientModule,
        MatCardModule,
        MatListModule,
        ToastrModule.forRoot(),
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule

      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        AuthService,
        AuthApi,
        HttpService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        UsersApi,
        ClientsApi,
        ReservesApi,
        LotsApi
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotDetailComponent);
    fixtureReserve = TestBed.createComponent(ReserveDialogComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of({})
    } as any);
    fixture.detectChanges();
  });


  it('should hide the button and change state from chip after dialog confirmation', async () => {
    const dialogReserveButton = fixtureReserve.debugElement.nativeElement.querySelector(`[data-testid="btnReserveInDialog"]`);
    const chipStateLot = getByTestId('chipStateLot');

    // Creo el lote
    const lot = new Lot();
    lot.id = 1;
    lot.state = 'DISPONIBLE';
    component.selectedLot = lot;

    // Mockeo que el hasAssigned de lot me devuelva true
    spyOn(lot, 'hasAssigned').and.returnValue(true)
    fixture.detectChanges();

    lot.state = 'RESERVADO';
    spyOn(component.lotService, 'getLotById').withArgs(1).and.returnValue(Promise.resolve(lot))

    // Clickeo el botón "Reservar" del detalle del lote
    const reserveInLotDetailButton: HTMLElement = getByTestId('btnReserveInLotDetail');
    reserveInLotDetailButton.click();

    // El chip dice 'DISPONIBLE'
    expect(chipStateLot.innerHTML.trim()).toBe('DISPONIBLE');
    // El botón de reservar está visible
    expect(reserveInLotDetailButton).toBeTruthy();

    fixtureReserve.detectChanges();
    dialogReserveButton.click();
    fixture.detectChanges();

    // El chip dice 'RESERVADO'
    expect(chipStateLot.innerHTML.trim()).toBe('RESERVADO');
    // El botón de reservar deja de estar visible
    expect(getByTestId('btnReserveInLotDetail')).toBeFalsy();

  });


    function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }
});
