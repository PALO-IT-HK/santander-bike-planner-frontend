import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikepointsSearchResultEntryComponent } from './bikepoints-search-result-entry.component';

describe('BikepointsSearchResultEntryComponent', () => {
  let component: BikepointsSearchResultEntryComponent;
  let fixture: ComponentFixture<BikepointsSearchResultEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikepointsSearchResultEntryComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikepointsSearchResultEntryComponent);
    component = fixture.componentInstance;
    component.bikepoint = {
      id: 'test',
      commonName: 'unittest',
      lat: 0,
      lng: 0,
    };
    component.occupancy = {
      total: 10,
      bike: 6,
      vacant: 4,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
