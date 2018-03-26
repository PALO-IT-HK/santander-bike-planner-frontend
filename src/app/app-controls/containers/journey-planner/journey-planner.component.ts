import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RootReducer } from '../../../reducers';
import { JourneyMapActions } from '../../../journey-map/journey-map.action';

import { PlaceService } from '../../services';
import { AppState } from '../../models';
import { AppControlActions } from '../../app-controls.action';
import { AppControlReducer } from '../../app-controls.reducer';

@Component({
  selector: 'app-journey-planner',
  templateUrl: './journey-planner.component.html',
  styleUrls: ['./journey-planner.component.scss']
})
export class JourneyPlannerComponent implements OnInit, OnDestroy {
  @Input() appState: AppState;
  haveSearchResults$: Observable<boolean>;

  subscriptions: Subscription[] = [];

  fromField = new FormControl('');
  toField = new FormControl('');

  constructor(
    private store: Store<RootReducer.State>,
    private placeService: PlaceService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.fromField.valueChanges.debounceTime(200).subscribe((value) => {
        this.store.dispatch(new AppControlActions.SetFromFieldAction(value));
        this.store.dispatch(new AppControlActions.SelectFromBikepointAction(null));
      }),
      this.toField.valueChanges.debounceTime(200).subscribe((value) => {
        this.store.dispatch(new AppControlActions.SetToFieldAction(value));
        this.store.dispatch(new AppControlActions.SelectToBikepointAction(null));
      }),
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
    this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.IN_JOURNEY));
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
}
