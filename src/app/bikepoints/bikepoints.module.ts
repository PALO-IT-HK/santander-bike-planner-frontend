import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BikePointsService } from './services/bikepoints.service';
import { JourneyService } from './services/journey.service';
import { PlaceService } from './services/place.service';

/**
 *  Bikepoint module is used for grouping up services required to access
 *  BikePoints API endpoint, as well as storing data in relevant reducers
 */
@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    BikePointsService,
    JourneyService,
    PlaceService,
  ]
})
export class BikepointsModule { }
