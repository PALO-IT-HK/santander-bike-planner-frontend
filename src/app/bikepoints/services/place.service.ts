import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class PlaceService {
  constructor(
    private http: HttpClient,
  ) { }

  public getPlaceAutoComplete(input) {
    const params: HttpParams = new HttpParams()
      .set('input', String(input))
      .set('types', 'geocode');

    return this.http.get(`${environment.apiBase}/place/autocomplete`, {
      params,
    });
  }

  public getCurrentLocationFromGoogle() {
    const params: HttpParams = new HttpParams()
      .set('key', environment.googleGeoLocateAPIKey);

    return this.http.post('https://www.googleapis.com/geolocation/v1/geolocate', {}, {
      params
    });
  }
}
