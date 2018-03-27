import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Map Module from ngui
import { NguiMapModule } from '@ngui/map';

import { environment } from '../../environments/environment';

import { MaterialModule } from '../material.module';
import { BikepointsModule } from '../bikepoints/bikepoints.module';

import { JourneyMapEffects, JourneyMapReducer } from './index';

// Dump Components
import {
  BikepointInfoComponent,
  BikepointMarkerComponent
} from './components';

// Smart Components
import {
  MapComponent
} from './containers';

@NgModule({
  imports: [
    CommonModule,
    BikepointsModule,
    MaterialModule,
    NguiMapModule.forRoot({
      apiUrl: `https://maps.google.com/maps/api/js?libraries=places&key=${environment.googleMapsAPIKey}`
    }),

    StoreModule.forFeature(JourneyMapReducer.name, JourneyMapReducer.reducer),
    EffectsModule.forFeature([
      JourneyMapEffects
    ]),
  ],
  declarations: [
    MapComponent,
    BikepointInfoComponent,
    BikepointMarkerComponent
  ],
  exports: [
    MapComponent
  ],
})
export class JourneyMapModule { }
