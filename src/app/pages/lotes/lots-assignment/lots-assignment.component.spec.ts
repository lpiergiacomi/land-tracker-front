import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsAssignmentComponent } from './lots-assignment.component';

describe('LotsAssignmentComponent', () => {
  let component: LotsAssignmentComponent;
  let fixture: ComponentFixture<LotsAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotsAssignmentComponent]
    });
    fixture = TestBed.createComponent(LotsAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
