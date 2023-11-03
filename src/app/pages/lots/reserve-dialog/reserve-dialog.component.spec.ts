import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDialogComponent } from './reserve-dialog.component';
import {Client} from "../../../backend/model/client";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ClientsApi} from "../../../backend/api/clients-api.service";
import {HttpService} from "../../../backend/api/http.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReservesApi} from "../../../backend/api/reserves-api.service";
import {AuthApi} from "../../../backend/api/auth.api";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {ToastrModule} from "ngx-toastr";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ReactiveFormsModule} from "@angular/forms";
import {httpClientSpy} from "../../../backend/services/httpClientSpy";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {User} from "../../../backend/model/user";
import {Lot} from "../../../backend/model/lot";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

describe('ReserveDialogComponent', () => {
  let component: ReserveDialogComponent;
  let fixture: ComponentFixture<ReserveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReserveDialogComponent
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
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
        HttpService,
        ClientsApi,
        ReservesApi,
        AuthApi,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        { provide: HttpClient, useValue: httpClientSpy, }

      ]
    });
    fixture = TestBed.createComponent(ReserveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('selecting a valid client, the reserve button is enabled', async () => {

    const dialogReserveButton = getByTestId('btnReserveInDialog');
    expect(component.newReserveForm.valid).toBeFalse();
    expect(dialogReserveButton.disabled).toBeTrue();

    const client = new Client();
    client.id = 1;
    component.client.setValue(client);

    fixture.detectChanges();

    expect(component.newReserveForm.valid).toBeTrue();
    expect(dialogReserveButton.disabled).toBeFalse();

  });

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }
});
