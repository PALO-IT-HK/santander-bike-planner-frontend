import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Map Module from ngui
import { NguiMapModule } from '@ngui/map';

import { environment } from '../../environments/environment';

import { BikepointsModule } from '../bikepoints';

import { JourneyMapReducer } from './journey-map.reducer';
import { JourneyMapEffects } from './journey-map.effect';

// Dump Components
import { BikepointInfoComponent } from './components';

// Smart Components
import { MapComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    BikepointsModule,
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
    BikepointInfoComponent
  ],
  exports: [
    MapComponent
  ],
})
export class JourneyMapModule { }
