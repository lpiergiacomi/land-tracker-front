import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEventComponent } from './test-event.component';

describe('TestEventComponent', () => {
  let component: TestEventComponent;
  let fixture: ComponentFixture<TestEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestEventComponent]
    });
    fixture = TestBed.createComponent(TestEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
