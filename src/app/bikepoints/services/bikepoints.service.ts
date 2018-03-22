import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { LatLong } from '../../models';

@Injectable()
export class BikePointsService {
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get all available bikepoints
   */
  public listBikePoints() {
    return this.http.get(`${environment.apiBase}/bike/point`, {});
  }

  /**
   * Get all bikepoints within a map boundary
   * @param northEast : LatLong coordinate of NorthEast corner of the map
   * @param southWest : LatLong coordinate of SouthWest corner of the map
   */
  public listBikePointsByBounds(northEast: LatLong, southWest: LatLong) {
    const params: HttpParams = new HttpParams()
      .set('neLat', String(northEast.lat))
      .set('neLon', String(northEast.lng))
      .set('swLat', String(southWest.lat))
      .set('swLon', String(southWest.lng));

    return this.http.get(`${environment.apiBase}/bike/point`, {
      params
    });
  }
}
