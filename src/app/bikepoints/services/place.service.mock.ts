import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class PlaceServiceMock {
  constructor(
    private http: HttpClient,
  ) { }

  public getPlaceAutoComplete(input) {
    return;
  }

  public getCurrentLocation() {
    return;
  }
}
