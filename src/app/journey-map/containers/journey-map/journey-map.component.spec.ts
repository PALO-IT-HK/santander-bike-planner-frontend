import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BikepointsModule } from '../../../bikepoints/bikepoints.module';

import { JourneyMapReducer } from '../../journey-map.reducer';
import { JourneyMapComponent } from './journey-map.component';
import { MaterialModule } from '../../../material.module';
import { JourneyPlannerReducer } from '../../../journey-planner/journey-planner.reducer';

describe('MapComponent', () => {
  let component: JourneyMapComponent;
  let fixture: ComponentFixture<JourneyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BikepointsModule,
        StoreModule.forRoot({
          [JourneyMapReducer.name]: JourneyMapReducer.reducer,
          [JourneyPlannerReducer.name]: JourneyPlannerReducer.reducer,
        }),
        EffectsModule.forRoot([]),
      ],
      declarations: [JourneyMapComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
