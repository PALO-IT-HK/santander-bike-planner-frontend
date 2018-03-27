import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material UI Module
import { MaterialModule } from '../material.module';

// Feature Modules
import { AppControlsModule } from '../app-controls/app-controls.module';
import { BikepointsModule } from '../bikepoints/bikepoints.module';
import { JourneyMapModule } from '../journey-map/journey-map.module';
import { JourneyPlannerComponentsModule } from './components/components.module';
import { JourneyPlannerComponent } from './containers/journey-planner/journey-planner.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    /**
     * Feature Modules
     */
    AppControlsModule,
    BikepointsModule,
    JourneyMapModule,
    JourneyPlannerComponentsModule,
  ],
  declarations: [JourneyPlannerComponent],
  exports: [JourneyPlannerComponent],
})
export class JourneyPlannerModule { }
