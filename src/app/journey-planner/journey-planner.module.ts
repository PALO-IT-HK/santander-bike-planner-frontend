import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Material UI Module
import { MaterialModule } from '../material.module';

// Feature Modules
import { AuthModule } from '../auth/auth.module';
import { AppControlsModule } from '../app-controls/app-controls.module';
import { BikepointsModule } from '../bikepoints/bikepoints.module';
import { JourneyMapModule } from '../journey-map/journey-map.module';

import { JourneyPlannerComponentsModule } from './components/components.module';
import { JourneyPlannerComponent } from './containers/journey-planner/journey-planner.component';

import { JourneyPlannerReducer } from './journey-planner.reducer';
import { JourneyPlannerEffects } from './journey-planner.effect';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    /**
     * Feature Modules
     */
    AuthModule,
    AppControlsModule,
    BikepointsModule,
    JourneyMapModule,
    StoreModule.forFeature(JourneyPlannerReducer.name, JourneyPlannerReducer.reducer),
    EffectsModule.forFeature([
      JourneyPlannerEffects
    ]),
    JourneyPlannerComponentsModule,
  ],
  declarations: [JourneyPlannerComponent],
  exports: [JourneyPlannerComponent],
})
export class JourneyPlannerModule { }
