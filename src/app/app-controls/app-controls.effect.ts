import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PlaceService } from './services';
import { AppControlActions } from './app-controls.action';
import { AppControlReducer } from './app-controls.reducer';
import { BikePointsService } from '../bikepoints';
import { AppState } from './models';

@Injectable()
export class AppControlEffects {
  // @Effect()
  // fromFieldUpdate$: Observable<Action> = this.actions$
  //   .ofType(AppControlActions.SET_FROM_FIELD)
  //   .do(() => this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.FROM_INPUT)))
  //   .debounceTime(2000)
  //   .switchMap((action: AppControlActions.SetFromFieldAction) => {
  //     return [];
  //   });

  // @Effect()
  // toFieldUpdate$: Observable<Action> = this.actions$
  //   .ofType(AppControlActions.SET_TO_FIELD)
  //   .do(() => this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.TO_INPUT)))
  //   .debounceTime(2000)
  //   .switchMap((action: AppControlActions.SetToFieldAction) => {
  //     return [];
  //   });

  @Effect()
  searchBikepoint$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SEARCH_BIKEPOINT)
    .switchMap((action: AppControlActions.SearchBikepointAction) =>
      this.bpService.searchBikepoint(action.payload))
    .switchMap((result) => {
      console.log(result);
      return [];
    });

  @Effect()
  fromLoc$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SELECT_FROM_BIKEPOINT)
    .filter((action: AppControlActions.SelectFromBikepointAction) => Boolean(action.payload))
    .switchMap((action: AppControlActions.SelectFromBikepointAction) => [
      new AppControlActions.SetFromFieldAction(action.payload.commonName),
    ]);

  @Effect()
  toLoc$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SELECT_TO_BIKEPOINT)
    .filter((action: AppControlActions.SelectToBikepointAction) => Boolean(action.payload))
    .switchMap((action: AppControlActions.SelectToBikepointAction) => [
      new AppControlActions.SetToFieldAction(action.payload.commonName),
    ]);

  constructor(
    private actions$: Actions,
    private store: Store<AppControlReducer.State>,
    private placeService: PlaceService,
    private bpService: BikePointsService,
  ) { }
}
