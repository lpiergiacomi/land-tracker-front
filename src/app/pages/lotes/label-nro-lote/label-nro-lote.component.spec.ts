import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelNroLoteComponent } from './label-nro-lote.component';

describe('LabelNroLoteComponent', () => {
  let component: LabelNroLoteComponent;
  let fixture: ComponentFixture<LabelNroLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelNroLoteComponent]
    });
    fixture = TestBed.createComponent(LabelNroLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
