import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikepointsSearchResultEntryComponent } from './bikepoints-search-result-entry.component';
import { StoreModule } from '@ngrx/store';
import { BikePointsMockService } from '../../../bikepoints/services/bikepoints.service.mock';
import { BikePointsService } from '../../../bikepoints/services/bikepoints.service';

describe('BikepointsSearchResultEntryComponent', () => {
  let component: BikepointsSearchResultEntryComponent;
  let fixture: ComponentFixture<BikepointsSearchResultEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikepointsSearchResultEntryComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: BikePointsService,
        useClass: BikePointsMockService
      }],
      imports: [
        StoreModule.forRoot({}),
      ],
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
