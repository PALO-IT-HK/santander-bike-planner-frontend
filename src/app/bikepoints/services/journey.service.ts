import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { LatLong, Journey } from '../../models';

@Injectable()
export class JourneyService {
  constructor(
    private http: HttpClient,
  ) { }

  public getJourney(startLatLng: LatLong, endLatLng: LatLong) {
    const params: HttpParams = new HttpParams()
      .set('startpt', `${startLatLng.lat},${startLatLng.lng}`)
      .set('endpt', `${endLatLng.lat},${endLatLng.lng}`);

    return this.http.get(`${environment.journeyApiBase}/bike/journey`, {
      params
    }).map((result: any): Journey => {
      return {
        duration: result.duration,
        startAt: result.startDateTime,
        endAt: result.arrivalDateTime,
        path: JSON.parse(result.lineString).map((entry): LatLong => ({ lat: entry[0], lng: entry[1] })),
      };
    });
  }
}
