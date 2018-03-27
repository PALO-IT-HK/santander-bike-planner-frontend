import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BikepointsModule } from '../../../bikepoints/bikepoints.module';

import { JourneyMapReducer } from '../../journey-map.reducer';
import { JourneyMapComponent } from './journey-map.component';

describe('MapComponent', () => {
  let component: JourneyMapComponent;
  let fixture: ComponentFixture<JourneyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BikepointsModule,
        StoreModule.forRoot({
          journeyMap: JourneyMapReducer.reducer,
        }),
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
