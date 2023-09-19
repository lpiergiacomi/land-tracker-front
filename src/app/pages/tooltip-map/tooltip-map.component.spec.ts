import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipMapComponent } from './tooltip-map.component';

describe('TooltipMapComponent', () => {
  let component: TooltipMapComponent;
  let fixture: ComponentFixture<TooltipMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipMapComponent]
    });
    fixture = TestBed.createComponent(TooltipMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
