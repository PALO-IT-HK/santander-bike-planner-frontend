import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, BikePoint } from '../models';
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
    .combineLatest(this.store.select(JourneyMapReducer.selectors.autofetchBikepoints))
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
    .switchMap((action: JourneyMapActions.FetchBikepointsAction) =>
      this.bpServices.listBikePointsByBounds(action.payload.ne, action.payload.sw))
    .switchMap((result: BikePoint[]) => {
      return [new JourneyMapActions.PopulateBikepointsAction(result)];
    });

  constructor(
    private actions$: Actions,
    private store: Store<JourneyMapReducer.State>,
    private bpServices: BikePointsService,
  ) { }
}
