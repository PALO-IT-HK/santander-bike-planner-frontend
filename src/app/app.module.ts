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

import { JourneyMapModule } from './journey-map';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,

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
     * Set up DevTools for state store
     */
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 30,
    }) : [],

    /**
     * Set up ngrx effects
     */
    EffectsModule.forRoot([]),

    JourneyMapModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
