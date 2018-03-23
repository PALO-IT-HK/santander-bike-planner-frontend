import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BikePoint } from '../models';
import { BikePointsService } from '../bikepoints';

import { JourneyMapActions } from './journey-map.action';
import { JourneyMapReducer } from './journey-map.reducer';

@Injectable()
export class JourneyMapEffects {
  @Effect()
  mapBoundaryUpdate$: Observable<Action> = this.actions$
    .ofType(JourneyMapActions.UPDATE_MAP_BOUNDARY)
    .debounceTime(1000)
    // Check if we are displaying bikepoint
    .combineLatest(this.store.select(JourneyMapReducer.selectors.displayBikepoints))
    .switchMap(([action, display]: [JourneyMapActions.UpdateMapBoundaryAction, boolean]) => {
      // Update bikepoints only if the map is displaying them.
      if (!display) {
        return [];
      }

      return this.bpServices.listBikePointsByBounds(action.payload.ne, action.payload.sw)
        .switchMap((result: Array<any>) => {
          const bikepoints: BikePoint[] = result.map((bp): BikePoint => ({
            commonName: bp.commonName,
            id: bp.TerminalName,
            lat: bp.lat,
            lng: bp.lon,
            occupancy: {
              total: bp.NbDocks,
              bike: bp.NbBikes,
              vacant: bp.NbEmptyDocks,
            }
          }));
          return [
            new JourneyMapActions.PopulateBikepointsAction(bikepoints),
          ];
        });
    });

  constructor(
    private actions$: Actions,
    private store: Store<JourneyMapReducer.State>,
    private bpServices: BikePointsService,
  ) { }
}
