import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BikePointsService } from './services/bikepoints.service';
import { JourneyService } from './services/journey.service';
import { PlaceService } from './services/place.service';

import { BikepointsOccupancyReducer } from './bikepoints.reducer';

/**
 *  Bikepoint module is used for grouping up services required to access
 *  BikePoints API endpoint, as well as storing data in relevant reducers
 */
@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(BikepointsOccupancyReducer.name, BikepointsOccupancyReducer.reducer),
  ],
  providers: [
    BikePointsService,
    JourneyService,
    PlaceService,
  ]
})
export class BikepointsModule { }
