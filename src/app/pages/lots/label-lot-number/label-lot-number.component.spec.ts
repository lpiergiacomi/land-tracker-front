import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelLotNumber } from './label-lot-number.component';

describe('LabelLotNumber', () => {
  let component: LabelLotNumber;
  let fixture: ComponentFixture<LabelLotNumber>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelLotNumber]
    });
    fixture = TestBed.createComponent(LabelLotNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
