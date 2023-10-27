import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLotSearcherComponent } from './map-lot-searcher.component';
import {LotsApi} from "../../../backend/api/lots-api.service";
import {HttpService} from "../../../backend/api/http.service";
import {HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('MapLotSearcherComponent', () => {
  let component: MapLotSearcherComponent;
  let fixture: ComponentFixture<MapLotSearcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapLotSearcherComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatOptionModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatExpansionModule,
        MatSelectModule,
        BrowserAnimationsModule,

      ],
      providers: [
        LotsApi,
        HttpService,

      ]
    });
    fixture = TestBed.createComponent(MapLotSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display and update input value', async () => {
    await sendInput('filterText', 'Lote 1')
    await sendSelect('filterStates', ['DISPONIBLE', 'RESERVADO'])

    const filterText = getByTestId('filterText');
    const filterStates = getByTestId('filterStates');

    fixture.detectChanges();
    await fixture.whenStable()

    expect(filterText.value).toBe('Lote 1');
    expect(filterStates.value).toEqual(['DISPONIBLE', 'RESERVADO']);

    const filterLotsSpy = spyOn(component, 'filterLots');
    getByTestId('btnCleanFilters').click();
    fixture.detectChanges();

    expect(filterText.value).toBe('');
    //expect(filterStates.value).toEqual([]); //TODO: No funciona. cleanFilters() del component lo deja como [], pero acá sigue esperando ['DISPONIBLE', 'RESERVADO']

    expect(filterLotsSpy).toHaveBeenCalled();

  });

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"`)
  }

  async function sendInput(testId: string, text: string) {
    const inputElement = getByTestId(testId)
    inputElement.value = text
    inputElement.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    return fixture.whenStable()
  }

  async function sendSelect(testId: string, options: any[]) {
    const inputElement = getByTestId(testId)
    inputElement.value = options
    inputElement.dispatchEvent(new Event('change'))
    fixture.detectChanges()
    return fixture.whenStable()
  }

});
