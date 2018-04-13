import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, BikePoint, LatLong } from '../models';
import { RootReducer } from '../reducers';
import { AppControlReducer } from '../app-controls/app-controls.reducer';
import { BikePointsService } from '../bikepoints/services/bikepoints.service';

import { JourneyMapActions } from './journey-map.action';
import { JourneyMapReducer } from './journey-map.reducer';

@Injectable()
export class JourneyMapEffects {
  @Effect()
  mapBoundaryUpdate$: Observable<Action> = this.actions$
    .ofType(JourneyMapActions.UPDATE_MAP_BOUNDARY)
    // Check if we are displaying bikepoint
    .debounceTime(1000)
    .withLatestFrom(this.store.select(JourneyMapReducer.selectors.autofetchBikepoints))
    .switchMap(([action, autofetch]: [JourneyMapActions.UpdateMapBoundaryAction, boolean]) => {
      // Update bikepoints only if autofetch is set
      if (autofetch) {
        return [new JourneyMapActions.FetchBikepointsAction(action.payload)];
      }
      return [];
    });

  @Effect()
  fetchBikepointBoundary$: Observable<Action> = this.actions$
    .ofType(JourneyMapActions.FETCH_BIKEPOINTS)
    .do(() => this.store.dispatch(new JourneyMapActions.SetMapLoadingAction(true)))
    .switchMap((action: JourneyMapActions.FetchBikepointsAction) =>
      this.bpServices.listBikePointsByBounds(action.payload.ne, action.payload.sw))
    .withLatestFrom(this.store.select(AppControlReducer.selectors.appState))
    .switchMap(([result, appState]: [BikePoint[], AppState]) => {
      if (appState === AppState.CONFIRM_JOURNEY || appState === AppState.IN_JOURNEY) {
        return [];
      }
      return [
        new JourneyMapActions.PopulateBikepointsAction(result),
        new JourneyMapActions.SetMapLoadingAction(false),
      ];
    });

  @Effect()
  resetMapState$: Observable<Action> = this.actions$
    .ofType(JourneyMapActions.RESET_MAP_STATE_ACTION)
    .withLatestFrom(this.store.select(JourneyMapReducer.selectors.mapBoundary))
    .switchMap(([action, boundary]) => {
      return [new JourneyMapActions.FetchBikepointsAction(boundary)];
    });

  @Effect()
  setJourney$: Observable<Action> = this.actions$
    .ofType(JourneyMapActions.UPDATE_JOURNEY)
    .filter((action: JourneyMapActions.SetJourneyAction) => Boolean(action.payload))
    .switchMap((action: JourneyMapActions.SetJourneyAction) => {
      const path = action.payload.path;
      const minMaxLatLng = path.reduce((result, point) => {
        return {
          minLat: Math.min(result.minLat, point.lat),
          maxLat: Math.max(result.maxLat, point.lat),
          minLng: Math.min(result.minLng, point.lng),
          maxLng: Math.max(result.maxLng, point.lng),
        };
      }, {
        minLat: Number.POSITIVE_INFINITY,
        maxLat: Number.NEGATIVE_INFINITY,
        minLng: Number.POSITIVE_INFINITY,
        maxLng: Number.NEGATIVE_INFINITY,
      });
      const center: LatLong = {
        lat: (minMaxLatLng.minLat + minMaxLatLng.maxLat) / 2,
        lng: (minMaxLatLng.minLng + minMaxLatLng.maxLng) / 2,
      };

      return [
        new JourneyMapActions.SetMapZoomAction(this.getZoomLevel(minMaxLatLng) - 1),
        new JourneyMapActions.SetMapCenterAction(center),
      ];
    });

  getZoomLevel(minMaxLatLng) {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;
    const mapDim = { height: window.innerHeight, width: window.innerWidth };

    function latRad(lat) {
      const sin = Math.sin(lat * Math.PI / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    const latFraction = (latRad(minMaxLatLng.maxLat) - latRad(minMaxLatLng.minLat)) / Math.PI;
    const lngDiff = minMaxLatLng.maxLng - minMaxLatLng.minLng;
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }

  constructor(
    private actions$: Actions,
    private store: Store<RootReducer.State>,
    private bpServices: BikePointsService,
  ) { }
}
