import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Map Module from ngui
import { NguiMapModule } from '@ngui/map';

import { environment } from '../../environments/environment';

import { MaterialModule } from '../material.module';
import { BikepointsModule } from '../bikepoints/bikepoints.module';

import { JourneyMapEffects } from './journey-map.effect';
import { JourneyMapReducer } from './journey-map.reducer';

import { JourneyMapComponentsModule } from './components/components.module';
import { JourneyMapComponent } from './containers/journey-map/journey-map.component';

@NgModule({
  imports: [
    CommonModule,
    BikepointsModule,
    JourneyMapComponentsModule,
    NguiMapModule.forRoot({
      apiUrl: `https://maps.google.com/maps/api/js?libraries=places&key=${environment.googleAPIKey}`
    }),

    StoreModule.forFeature(JourneyMapReducer.name, JourneyMapReducer.reducer),
    EffectsModule.forFeature([
      JourneyMapEffects
    ]),
  ],
  declarations: [
    JourneyMapComponent,
  ],
  exports: [
    JourneyMapComponent,
  ],
})
export class JourneyMapModule { }
