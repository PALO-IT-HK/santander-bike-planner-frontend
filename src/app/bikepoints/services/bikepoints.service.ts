import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { LatLong, BikePoint, BikePointOccupancy, BikePointOccupancyHash } from '../../models';

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
    }).map((result: any[]): BikePoint[] => result.map((bp): BikePoint => ({
      commonName: bp.commonName,
      id: bp.TerminalName,
      lat: bp.lat,
      lng: bp.lon,
      occupancy: {
        total: Number.parseInt(bp.NbDocks),
        bike: Number.parseInt(bp.NbBikes),
        vacant: Number.parseInt(bp.NbEmptyDocks),
      }
    })));
  }

  public searchBikepoint(input) {
    const params: HttpParams = new HttpParams()
      .set('query', input);

    return this.http.get(`${environment.apiBase}/bikepoint/search`, {
      params
    }).map((result: any[]): BikePoint[] => result.map((entry): BikePoint => ({
      commonName: entry.commonName,
      id: entry.id,
      lat: entry.lat,
      lng: entry.lon,
      // Search endpoint does not return bikepoint occupancy
    })));
  }

  public fetchOccupancyDetail(bikepointId: string) {
    const params: HttpParams = new HttpParams()
      .set('bikepoint', bikepointId);

    return this.http.get(`${environment.apiBase}/bikepoint/search`, {
      params
    }).map((result: any[]): BikePointOccupancyHash => result.reduce(
      (accum: BikePointOccupancyHash, entry): BikePointOccupancyHash => {
        return {
          ...accum,
          [entry.id]: {
            total: Number.parseInt(entry.totalDocks),
            bike: Number.parseInt(entry.bikesCount),
            vacant: Number.parseInt(entry.emptyDocks),
          },
        };
      },
      {}
    ));
  }
}
