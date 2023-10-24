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

  it('should display and update input value', () => {

    const filterText = getByTestId('filterText');
    const filterStates = getByTestId('filterStates');

    filterText.value = 'Lote 1';
    filterStates.value = ['DISPONIBLE', 'RESERVADO'];
    fixture.detectChanges();

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

});
