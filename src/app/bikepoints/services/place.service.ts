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
      .set('query', String(input))
      .set('types', 'geocode')
      .set('key', environment.googleMapsAPIKey);

    return this.http.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params,
    });
  }

  public getCurrentLocation() {
    const params: HttpParams = new HttpParams()
      .set('key', environment.googleGeoLocateAPIKey);

    return this.http.post('https://www.googleapis.com/geolocation/v1/geolocate', {}, {
      params
    });
  }
}
