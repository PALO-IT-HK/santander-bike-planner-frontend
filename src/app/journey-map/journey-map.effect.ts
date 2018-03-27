import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, BikePoint } from '../models';
import { RootReducer } from '../reducers';
import { AppControlReducer } from '../app-controls';
import { BikePointsService } from '../bikepoints';

import { JourneyMapActions } from './journey-map.action';

@Injectable()
export class JourneyMapEffects {
  @Effect()
  mapBoundaryUpdate$: Observable<Action> = this.actions$
    .ofType(JourneyMapActions.UPDATE_MAP_BOUNDARY)
    // Check if we are displaying bikepoint
    .debounceTime(1000)
    .combineLatest(this.store.select(AppControlReducer.selectors.appState))
    .switchMap(([action, appState]: [JourneyMapActions.UpdateMapBoundaryAction, AppState]) => {
      // Update bikepoints only if the map is displaying them.
      switch (appState) {
        case AppState.NORMAL:
        case AppState.FROM_INPUT:
        case AppState.TO_INPUT:
          return this.bpServices.listBikePointsByBounds(action.payload.ne, action.payload.sw)
            .switchMap((result: BikePoint[]) => {
              return [
                new JourneyMapActions.PopulateBikepointsAction(result),
              ];
            });
        default:
          return [];
      }
    });

  constructor(
    private actions$: Actions,
    private store: Store<RootReducer.State>,
    private bpServices: BikePointsService,
  ) { }
}
