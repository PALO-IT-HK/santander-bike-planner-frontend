import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BikePointsService, PlaceService } from './services';

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
    PlaceService,
  ]
})
export class BikepointsModule { }
