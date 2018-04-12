import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// Map Module from ngui
import { NguiMapModule } from '@ngui/map';

// ngrx Store and Effects
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootReducer } from './reducers';
import './operators'; // Observable operators

import { AuthModule } from './auth/auth.module';
import { AppControlsModule } from './app-controls/app-controls.module';
import { JourneyPlannerModule } from './journey-planner/journey-planner.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    /**
     * Set up ngrx state store
     */
    StoreModule.forRoot(
      RootReducer.reducers,
      {
        metaReducers: RootReducer.metaReducers
      },
    ),

    /**
     * Set up ngrx effects
     */
    EffectsModule.forRoot([]),

    /**
     * Set up DevTools for state store
     */
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 30,
    }) : [],

    AuthModule,
    AppControlsModule,
    JourneyPlannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
