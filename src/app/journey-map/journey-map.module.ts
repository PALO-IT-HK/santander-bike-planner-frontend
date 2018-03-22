import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

// Map Module from ngui
import { NguiMapModule } from '@ngui/map';

import { environment } from '../../environments/environment';

import { JourneyMapReducer } from './journey-map.reducer';

// Dump Components
import { BikepointInfoComponent } from './components';

// Smart Components
import { MapComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    NguiMapModule.forRoot({
      apiUrl: `https://maps.google.com/maps/api/js?key=${environment.googleMapsAPIKey}`
    }),

    StoreModule.forFeature(JourneyMapReducer.name, JourneyMapReducer.reducer),
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
