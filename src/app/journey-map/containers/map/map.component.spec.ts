import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BikepointsModule } from '../../../bikepoints';

import { JourneyMapReducer } from '../../journey-map.reducer';
import { MapComponent } from './map.component';
import { AppControlReducer } from '../../../app-controls';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BikepointsModule,
        StoreModule.forRoot({
          journeyMap: JourneyMapReducer.reducer,
          appCtrl: AppControlReducer.reducer,
        }),
        EffectsModule.forRoot([]),
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

  it('mapCenter observable should contain initial data', () => {
    expect(component.mapCenter).toEqual(JourneyMapReducer.initialState.mapCenter);
  });
});
