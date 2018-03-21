import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../../environments/environment';

// Map Module from ngui
import { NguiMapModule } from '@ngui/map';

import { MapComponent } from './map/map.component';
import { BikepointInfoComponent } from './bikepoint-info/bikepoint-info.component';

@NgModule({
  imports: [
    CommonModule,
    NguiMapModule.forRoot({
      apiUrl: `https://maps.google.com/maps/api/js?key=${environment.googleMapsAPIKey}`
    }),
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
