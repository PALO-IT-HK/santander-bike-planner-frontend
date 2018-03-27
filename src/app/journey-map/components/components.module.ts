import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';

import { BikepointInfoComponent } from './bikepoint-info/bikepoint-info.component';
import { BikepointMarkerComponent } from './bikepoint-marker/bikepoint-marker.component';

const COMPONENTS = [
  BikepointInfoComponent,
  BikepointMarkerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class JourneyMapComponentsModule { }
