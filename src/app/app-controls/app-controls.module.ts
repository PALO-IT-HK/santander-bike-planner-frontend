import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material.module';

import { AppControlReducer } from './app-controls.reducer';
import { AppControlEffects } from './app-controls.effect';

import { PlaceService } from './services';
import { CtrlsOverlayComponent } from './containers';

/**
 *  AppControl module is for overall app workflow
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,

    StoreModule.forFeature(AppControlReducer.name, AppControlReducer.reducer),
    EffectsModule.forFeature([
      AppControlEffects,
    ]),
  ],
  declarations: [
    CtrlsOverlayComponent
  ],
  providers: [
    PlaceService,
  ],
  exports: [
    CtrlsOverlayComponent
  ],
})
export class AppControlsModule { }
