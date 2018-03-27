import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material.module';

import { AppControlReducer } from './app-controls.reducer';
import { AppControlEffects } from './app-controls.effect';

import { ConfirmJourneyComponent } from './components/confirm-journey/confirm-journey.component';
import { BikepointsSearchResultComponent } from './components/bikepoints-search-result/bikepoints-search-result.component';
import { PlaceSearchResultComponent } from './components/place-search-result/place-search-result.component';
import { CtrlsOverlayComponent } from './components/ctrls-overlay/ctrls-overlay.component';
import { JourneyPanelComponent } from './containers/journey-panel/journey-panel.component';
import { MapSearchBoxComponent } from './containers/map-search-box/map-search-box.component';

/**
 *  AppControl module is for overall app workflow
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,

    StoreModule.forFeature(AppControlReducer.name, AppControlReducer.reducer),
    EffectsModule.forFeature([
      AppControlEffects,
    ]),
  ],
  declarations: [
    ConfirmJourneyComponent,
    BikepointsSearchResultComponent,
    PlaceSearchResultComponent,
    JourneyPanelComponent,
    MapSearchBoxComponent,
    CtrlsOverlayComponent,
  ],
  exports: [
    CtrlsOverlayComponent,
  ],
})
export class AppControlsModule { }
