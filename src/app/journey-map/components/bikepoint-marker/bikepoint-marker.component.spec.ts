import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikepointMarkerComponent } from './bikepoint-marker.component';

describe('BikepointMarkerComponent', () => {
  let component: BikepointMarkerComponent;
  let fixture: ComponentFixture<BikepointMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikepointMarkerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikepointMarkerComponent);
    component = fixture.componentInstance;
    component.bikepoint = {
      commonName: 'unittest',
      id: 'unit-test',
      lat: 0,
      lng: 0,
      occupancy: {
        total: 10,
        bike: 6,
        vacant: 4
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
