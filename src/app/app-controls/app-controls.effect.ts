import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppControlActions } from './app-controls.action';
import { AppControlReducer } from './app-controls.reducer';
import { AppState, BikePoint } from '../models';
import { JourneyMapActions } from '../journey-map/journey-map.action';

import { PlaceService } from '../bikepoints/services/place.service';
import { BikePointsService } from '../bikepoints/services/bikepoints.service';
import { JourneyService } from '../bikepoints/services/journey.service';
import { JourneyMapReducer } from '../journey-map/journey-map.reducer';

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
    .do((action: AppControlActions.SetAppStateAction) => {
      switch (action.payload) {
        case AppState.CONFIRM_JOURNEY:
        case AppState.IN_JOURNEY:
          this.journeyStore.dispatch(new JourneyMapActions.PopulateBikepointsAction([]));
          this.journeyStore.dispatch(new JourneyMapActions.ToggleAutoFetchBikePointAction(false));
          break;
        default:
          this.journeyStore.dispatch(new JourneyMapActions.ToggleAutoFetchBikePointAction(true));
          this.journeyStore.dispatch(new JourneyMapActions.SetJourneyAction(null));
      }
    })
    .switchMap(() => []);

  @Effect()
  confirmJourney$: Observable<Action> = this.actions$
    .ofType(AppControlActions.SET_APP_STATE)
    .filter((action: AppControlActions.SetAppStateAction) => action.payload === AppState.CONFIRM_JOURNEY)
    .withLatestFrom(
      this.journeyStore.select(JourneyMapReducer.selectors.fromLoc),
      this.journeyStore.select(JourneyMapReducer.selectors.toLoc),
    )
    .switchMap(([action, fromLoc, toLoc]) => [
      new AppControlActions.QueryJourneyAction({
        start: fromLoc,
        end: toLoc,
      }),
    ]);

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
    .ofType(JourneyMapActions.SELECT_FROM_BIKEPOINT)
    .filter((action: JourneyMapActions.SelectFromBikepointAction) => Boolean(action.payload))
    .withLatestFrom(this.journeyStore.select(JourneyMapReducer.selectors.toLoc))
    .switchMap(([action, toLoc]: [
      JourneyMapActions.SelectFromBikepointAction,
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
    .ofType(JourneyMapActions.SELECT_TO_BIKEPOINT)
    .filter((action: JourneyMapActions.SelectToBikepointAction) => Boolean(action.payload))
    .withLatestFrom(this.journeyStore.select(JourneyMapReducer.selectors.fromLoc))
    .switchMap(([action, fromLoc]: [
      JourneyMapActions.SelectToBikepointAction,
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

  /**
   * Handle journey query action
   */
  @Effect()
  obtainJourney$: Observable<Action> = this.actions$
    .ofType(AppControlActions.QUERY_JOURNEY)
    .switchMap((action: AppControlActions.QueryJourneyAction) => this.journeyService.getJourney(
      action.payload.start,
      action.payload.end,
    ))
    .switchMap((result) => {
      return [
        new JourneyMapActions.SetJourneyAction(result)
      ];
    });

  constructor(
    private actions$: Actions,
    private journeyStore: Store<JourneyMapReducer.State>,
    private placeService: PlaceService,
    private bpService: BikePointsService,
    private journeyService: JourneyService,
  ) { }
}
