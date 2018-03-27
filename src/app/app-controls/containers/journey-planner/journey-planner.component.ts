import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState, BikePoint, MapLocation } from '../../../models';
import { RootReducer } from '../../../reducers';
import { JourneyMapActions } from '../../../journey-map';

import { AppControlActions, AppControlReducer } from '../../index';

@Component({
  selector: 'app-journey-planner',
  templateUrl: './journey-planner.component.html',
  styleUrls: ['./journey-planner.component.scss']
})
export class JourneyPlannerComponent implements OnInit, OnDestroy {
  @Input() appState: AppState;
  subscriptions: Subscription[] = [];

  haveSearchResults$: Observable<boolean> = this.store.select(AppControlReducer.selectors.haveSearchResults);
  bikeSearchResults$: Observable<BikePoint[]> = this.store.select(AppControlReducer.selectors.bikepointSearchResults);
  placeSearchResults$: Observable<MapLocation[]> = this.store.select(AppControlReducer.selectors.placeSearchResults);

  fromField = new FormControl('');
  toField = new FormControl('');

  constructor(
    private store: Store<RootReducer.State>,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      /**
       * Subscribe to reactive form state change for updating redux store
       */
      this.fromField.valueChanges.debounceTime(200).subscribe((value) => {
        this.store.dispatch(new AppControlActions.SetFromFieldAction(value));
        this.store.dispatch(new AppControlActions.SelectFromBikepointAction(null));
      }),
      this.toField.valueChanges.debounceTime(200).subscribe((value) => {
        this.store.dispatch(new AppControlActions.SetToFieldAction(value));
        this.store.dispatch(new AppControlActions.SelectToBikepointAction(null));
      }),

      /**
       * Subscribe to reactive form state change for searching bikepoint and place
       */
      this.fromField.valueChanges.debounceTime(2000).subscribe((value) => {
        if (value) {
          this.store.dispatch(new AppControlActions.SearchBikepointAction(value));
          this.store.dispatch(new AppControlActions.SearchPlaceAction(value));
        }
      }),
      this.toField.valueChanges.debounceTime(2000).subscribe((value) => {
        if (value) {
          this.store.dispatch(new AppControlActions.SearchBikepointAction(value));
          this.store.dispatch(new AppControlActions.SearchPlaceAction(value));
        }
      }),

      /**
       * Subscribe to redux store to update reactive form field
       */
      this.store.select(AppControlReducer.selectors.fromField).subscribe((value) => {
        this.fromField.setValue(value, {
          emitEvent: false
        });
      }),
      this.store.select(AppControlReducer.selectors.toField).subscribe((value) => {
        this.toField.setValue(value, {
          emitEvent: false
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  closePlanner() {
    this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.NORMAL));
    this.store.dispatch(new AppControlActions.SelectFromBikepointAction(null));
    this.store.dispatch(new AppControlActions.SelectToBikepointAction(null));
    this.store.dispatch(new AppControlActions.SetFromFieldAction(''));
    this.store.dispatch(new AppControlActions.SetToFieldAction(''));
  }

  confirmJourney() {
    // this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.IN_JOURNEY));
  }

  /**
   * When the from-field have focus, make sure the app is in `From_Input` mode
   */
  fromFieldOnFocus() {
    this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.FROM_INPUT));
  }

  /**
   * When the to-field have focus, make sure the app is in `To_Input` mode
   */
  toFieldOnFocus() {
    this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.TO_INPUT));
  }

  fieldOnBlur() {
    Observable.timer(200).do(() => {
      this.store.select(AppControlReducer.selectors.fromLoc)
        .withLatestFrom(this.store.select(AppControlReducer.selectors.toLoc))
        .subscribe(([fromLoc, toLoc]) => {
          if (fromLoc && toLoc) {
            this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.CONFIRM_JOURNEY));
          }
        });
    }).subscribe();
  }

  selectPlace() {

  }

  selectBikePoint(bikepoint: BikePoint) {
    switch (this.appState) {
      /**
       * If we are at `normal` app state or in `from input` state, clicking on
       * bikepoint marker would means that we are going to use that as `From`
       * point
       */
      case AppState.FROM_INPUT:
        this.store.dispatch(new AppControlActions.SelectFromBikepointAction(bikepoint));
        break;
      /**
       * If we are at `to input` state, clicking on bikepoint marker would means
       * that we are going to use that as `To` point
       */
      case AppState.TO_INPUT:
        this.store.dispatch(new AppControlActions.SelectToBikepointAction(bikepoint));
        break;
      default:
        return;
    }
  }
}
