import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppControlActions } from './app-controls.action';
import { AppControlReducer } from './app-controls.reducer';
import { BikePointsService, PlaceService } from '../bikepoints';
import { AppState, BikePoint } from '../models';
import { JourneyMapActions } from '../journey-map/journey-map.action';

@Injectable()
export class AppControlEffects {
  /**
   * When the application is transitioning to Confirm Journey / In Journey state,
   * clean up bikepoints
   *
   * This is a work around for custom map marker not being able to work very well with
   * *ngFor and *ngIf together
   */
  @Effect()
  appState$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SET_APP_STATE)
    .switchMap((action: AppControlActions.SetAppStateAction) => {
      switch (action.payload) {
        case AppState.CONFIRM_JOURNEY:
        case AppState.IN_JOURNEY:
          return [new JourneyMapActions.PopulateBikepointsAction([])];
        default:
          return [];
      }
    });

  /**
   * When SEARCH_BIKEPOINT action is dispatched, do appropriate searching and
   * update redux store
   */
  @Effect()
  searchBikepoint$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SEARCH_BIKEPOINT)
    .switchMap((action: AppControlActions.SearchBikepointAction) =>
      this.bpService.searchBikepoint(action.payload))
    .switchMap((result: BikePoint[]) => {
      return [
        new AppControlActions.UpdateBikepointSearchResultAction(result)
      ];
    });

  /**
   * Transit to another app state when `from` bikepoint is set
   */
  @Effect()
  fromLoc$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SELECT_FROM_BIKEPOINT)
    .filter((action: AppControlActions.SelectFromBikepointAction) => Boolean(action.payload))
    .withLatestFrom(this.store.select(AppControlReducer.selectors.toLoc))
    .switchMap(([action, toLoc]: [
      AppControlActions.SelectFromBikepointAction,
      BikePoint | null
    ]) => {
      return [
        // Update `From` field text
        new AppControlActions.SetFromFieldAction(action.payload.commonName),
        // Clear search results
        new AppControlActions.UpdateBikepointSearchResultAction([]),
        new AppControlActions.UpdatePlaceSearchResultAction([]),
        /**
         *  Set App state
         *  If `to` bikepoint is set, set state to proceed to confirm journey
         *  If not, proceed to `to input`
         */
        new AppControlActions.SetAppStateAction(
          toLoc ? AppState.CONFIRM_JOURNEY : AppState.TO_INPUT
        ),
      ];
    });

  /**
   * Transit to another app state when `to` bikepoint is set
   */
  @Effect()
  toLoc$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SELECT_TO_BIKEPOINT)
    .filter((action: AppControlActions.SelectToBikepointAction) => Boolean(action.payload))
    .withLatestFrom(this.store.select(AppControlReducer.selectors.fromLoc))
    .switchMap(([action, fromLoc]: [
      AppControlActions.SelectToBikepointAction,
      BikePoint | null
    ]) => {
      return [
        // Update `To` field text
        new AppControlActions.SetToFieldAction(action.payload.commonName),
        // Clear search results
        new AppControlActions.UpdateBikepointSearchResultAction([]),
        new AppControlActions.UpdatePlaceSearchResultAction([]),
        /**
         *  Set App state
         *  If `from` bikepoint is set, set state to proceed to confirm journey
         *  If not, proceed to `from input`
         */
        new AppControlActions.SetAppStateAction(
          fromLoc ? AppState.CONFIRM_JOURNEY : AppState.FROM_INPUT
        ),
      ];
    });

  constructor(
    private actions$: Actions,
    private store: Store<AppControlReducer.State>,
    private placeService: PlaceService,
    private bpService: BikePointsService,
  ) { }
}
