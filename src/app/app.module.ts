import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// Map Module from ngui
import { NguiMapModule } from '@ngui/map';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NguiMapModule.forRoot({
      apiUrl: `https://maps.google.com/maps/api/js?key=${environment.googleMapsAPIKey}`
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
