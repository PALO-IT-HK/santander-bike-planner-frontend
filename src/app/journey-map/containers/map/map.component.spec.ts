import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { BikepointsModule } from '../../../bikepoints';

import { JourneyMapReducer } from '../../journey-map.reducer';
import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BikepointsModule,
        StoreModule.forRoot({
          journeyMap: JourneyMapReducer.reducer
        })
      ],
      declarations: [ MapComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mapCenter observable should contain initial data', (done) => {
    component.mapCenter$.subscribe((data) => {
      expect(data).toEqual(JourneyMapReducer.initialState.mapCenter);
      done();
    });
  });
});
