import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLotSearcherComponent } from './map-lot-searcher.component';

describe('MapLotSearcherComponent', () => {
  let component: MapLotSearcherComponent;
  let fixture: ComponentFixture<MapLotSearcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapLotSearcherComponent]
    });
    fixture = TestBed.createComponent(MapLotSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
