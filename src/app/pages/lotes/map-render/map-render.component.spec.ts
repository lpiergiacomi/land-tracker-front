import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRenderComponent } from './map-render.component';

describe('MapRenderComponent', () => {
  let component: MapRenderComponent;
  let fixture: ComponentFixture<MapRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapRenderComponent]
    });
    fixture = TestBed.createComponent(MapRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
