import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { RootReducer } from '../../../reducers';
import { JourneyMapActions } from '../../../journey-map/journey-map.action';

import { PlaceService } from '../../services';
import { AppControlActions } from '../../app-control.action';
import { AppControlReducer } from '../../app-control.reducer';

@Component({
  selector: 'app-ctrls-overlay',
  templateUrl: './ctrls-overlay.component.html',
  styleUrls: ['./ctrls-overlay.component.scss']
})
export class CtrlsOverlayComponent implements OnInit, OnDestroy {
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
      }),
      this.toField.valueChanges.debounceTime(200).subscribe((value) => {
        this.store.dispatch(new AppControlActions.SetToFieldAction(value));
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
      // this.store.dispatch(new JourneyMapActions.GotoCurrentLocationAction(true));
    });
    // this.store.dispatch(new JourneyMapActions.SetMapCenterAction(''));
    // return navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position);
    //   this.store.dispatch(new JourneyMapActions.SetMapCenterAction(`[${position.coords.latitude}, ${position.coords.longitude}]`));
    // });
  }
}
