import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotDetailComponent } from './lot-detail.component';

describe('LotDetailComponent', () => {
  let component: LotDetailComponent;
  let fixture: ComponentFixture<LotDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotDetailComponent]
    });
    fixture = TestBed.createComponent(LotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
