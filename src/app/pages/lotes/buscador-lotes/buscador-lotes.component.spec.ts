import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorLotesComponent } from './buscador-lotes.component';

describe('BuscadorLotesComponent', () => {
  let component: BuscadorLotesComponent;
  let fixture: ComponentFixture<BuscadorLotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorLotesComponent]
    });
    fixture = TestBed.createComponent(BuscadorLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
