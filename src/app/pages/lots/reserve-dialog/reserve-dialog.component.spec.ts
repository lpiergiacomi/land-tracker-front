import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDialogComponent } from './reserve-dialog.component';

describe('ReserveDialogComponent', () => {
  let component: ReserveDialogComponent;
  let fixture: ComponentFixture<ReserveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveDialogComponent]
    });
    fixture = TestBed.createComponent(ReserveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
