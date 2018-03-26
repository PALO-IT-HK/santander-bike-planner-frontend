import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { RootReducer } from '../../../reducers';
import { JourneyMapActions } from '../../../journey-map/journey-map.action';

import { PlaceService } from '../../services';
import { AppState } from '../../models';
import { AppControlActions } from '../../app-controls.action';
import { AppControlReducer } from '../../app-controls.reducer';

@Component({
  selector: 'app-ctrls-overlay',
  templateUrl: './ctrls-overlay.component.html',
  styleUrls: ['./ctrls-overlay.component.scss']
})
export class CtrlsOverlayComponent implements OnInit, OnDestroy {
  @Input() appState: AppState;
  subscriptions: Subscription[] = [];

  fullMode = false;

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

  switchMode(mode) {
    this.fullMode = mode;
  }

  gotoCurrentLoc() {
    this.placeService.getCurrentLocation().subscribe((loc: any) => {
      this.store.dispatch(new JourneyMapActions.SetMapCenterAction(`${loc.location.lat}, ${loc.location.lng}`));
    });
  }

  /**
   * When the from-field have focus, switch the app to `From_Input` mode
   */
  fromFieldOnFocus() {
    this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.FROM_INPUT));
  }

  /**
   * When the to-field have focus, switch the app to `To_Input` mode
   */
  toFieldOnFocus() {
    this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.TO_INPUT));
  }
}
