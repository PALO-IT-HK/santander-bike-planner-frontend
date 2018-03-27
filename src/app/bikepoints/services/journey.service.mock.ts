import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { LatLong } from '../../models';

@Injectable()
export class JourneyServiceMock {
  constructor(
    private http: HttpClient,
  ) { }

  public getJourney(startLatLng: LatLong, endLatLng: LatLong) {
    return ;
  }
}
