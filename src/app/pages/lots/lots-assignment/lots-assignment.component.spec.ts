import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import { LotsAssignmentComponent } from './lots-assignment.component';
import {LotsApi} from "../../../backend/api/lots-api.service";
import {HttpService} from "../../../backend/api/http.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UsersApi} from "../../../backend/api/users.api";
import {ToastrModule} from "ngx-toastr";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {httpClientSpy, user1} from "../../../backend/services/httpClientSpy";
import {TableModule} from "primeng/table";
import {environment} from "../../../../environments/environment";
import {throwError} from "rxjs";

describe('LotsAssignmentComponent', () => {
  let component: LotsAssignmentComponent;
  let fixture: ComponentFixture<LotsAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TableModule
      ],
      declarations: [
        LotsAssignmentComponent
      ],
      providers: [
        HttpService,
        LotsApi,
        UsersApi,
        { provide: HttpClient, useValue: httpClientSpy, }
      ]
    });
    fixture = TestBed.createComponent(LotsAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('selecting a user shows the table and filters', async () => {

    expect(getByTestId('tableLots')).toBeFalsy();
    expect(getByTestId('blockFilter')).toBeFalsy();
    expect(getByTestId('zoneFilter')).toBeFalsy();

    component.userFilter.setValue(user1)
    fixture.detectChanges();

    expect(getByTestId('tableLots')).toBeTruthy();
    expect(getByTestId('blockFilter')).toBeTruthy();
    expect(getByTestId('zoneFilter')).toBeTruthy();


  });

  it('assignment should take effect', async () => {
    // Los users del componente se llenan haciendo /with-assigned-lots, que el httpClientSpy me devuelve dos usuarios (primero el user1)
    const user = component.users[0];
    component.selectedUser = user;
    component.userFilter.setValue(user)
    component.onSelectUser(user);
    fixture.detectChanges();

    getByTestId('btnConfirm').click();
    await fixture.whenStable()

    // Testeo que se llama al backend con ese "user1"
    expect(httpClientSpy.post).toHaveBeenCalledWith(`${environment.apiUrl}/lots/update-assigned-lots-to-user`, user1, undefined)
  });

  it('assignment should catch error', fakeAsync(() => {
    const toastrErrorSpy = spyOn(component.toastr, 'error');
    spyOn(component.lotService, 'updateAssignedLotsToUser').and.returnValue(
      throwError(() => 'Fake Error')
    )
    component.userFilter.setValue(user1)
    component.onSelectUser(user1);
    fixture.detectChanges();

    getByTestId('btnConfirm').click()
    fixture.detectChanges()
    expect(toastrErrorSpy).toHaveBeenCalledWith('Fake Error');

    flush()
  }))

  it('assignment should show toast successful', fakeAsync(() => {
    const toastrSuccessSpy = spyOn(component.toastr, 'success');

    component.userFilter.setValue(user1)
    component.onSelectUser(user1);
    fixture.detectChanges();

    getByTestId('btnConfirm').click()
    fixture.detectChanges()
    expect(toastrSuccessSpy).toHaveBeenCalledWith('Cambios realizados correctamente');

    flush()
  }))

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }
});
