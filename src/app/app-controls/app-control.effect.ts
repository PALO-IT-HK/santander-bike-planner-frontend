import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PlaceService } from './services';
import { AppControlActions } from './app-control.action';
import { AppControlReducer } from './app-control.reducer';
import { BikePointsService } from '../bikepoints';
import { AppState } from './models';

@Injectable()
export class AppControlEffects {
  @Effect()
  fromFieldUpdate$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SET_FROM_FIELD)
    .do(() => this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.FROM_INPUT)))
    .debounceTime(2000)
    .switchMap((action: AppControlActions.SetFromFieldAction) => {
      if (action.payload) {
        return [
          new AppControlActions.SearchBikepointAction(action.payload),
          new AppControlActions.SearchPlaceAction(action.payload),
        ];
      }
      // TODO: Clear bikepoint and place result
      return [];
    });

  @Effect()
  toFieldUpdate$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SET_TO_FIELD)
    .do(() => this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.TO_INPUT)))
    .debounceTime(2000)
    .switchMap((action: AppControlActions.SetToFieldAction) => {
      if (action.payload) {
        return [
          new AppControlActions.SearchBikepointAction(action.payload),
          new AppControlActions.SearchPlaceAction(action.payload),
        ];
      }
      // TODO: Clear bikepoint and place result
      return [];
    });

  @Effect()
  searchBikepoint$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SEARCH_BIKEPOINT)
    .switchMap((action: AppControlActions.SearchBikepointAction) =>
      this.bpService.searchBikepoint(action.payload))
    .switchMap((result) => {
      console.log(result);
      return [];
    });

  constructor(
    private actions$: Actions,
    private store: Store<AppControlReducer.State>,
    private placeService: PlaceService,
    private bpService: BikePointsService,
  ) { }
}
