import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../models';
import { RootReducer } from '../../../reducers';
import { JourneyMapActions } from '../../../journey-map';

import { AppControlActions, AppControlReducer } from '../../index';
import { PlaceService } from '../../services';

@Component({
  selector: 'app-map-search-box',
  templateUrl: './map-search-box.component.html',
  styleUrls: ['./map-search-box.component.scss']
})
export class MapSearchBoxComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  searchField = new FormControl('');

  constructor(
    private store: Store<RootReducer.State>,
    private placeService: PlaceService,
  ) { }

  ngOnInit() {
    /* Handle search field interaction */
    this.subscriptions.push(
      /* On field change, update state store and reset from bikepoint */
      this.searchField.valueChanges.debounceTime(200).subscribe((value) => {
        this.store.dispatch(new AppControlActions.SetFromFieldAction(value));
        this.store.dispatch(new AppControlActions.SelectFromBikepointAction(null));
      }),
      /* On field change, search for bikepoints and places */
      this.searchField.valueChanges.debounceTime(2000).subscribe((value) => {
        if (value) {
          this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.FROM_INPUT));
          this.store.dispatch(new AppControlActions.SearchBikepointAction(value));
          this.store.dispatch(new AppControlActions.SearchPlaceAction(value));
        }
      }),
      /* Upon changes in `from` bikepoint, reflect it in the search box */
      this.store.select(AppControlReducer.selectors.fromField).subscribe((value) => {
        this.searchField.setValue(value, {
          emitEvent: false
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  gotoCurrentLoc() {
    const placeSubscription = this.placeService.getCurrentLocation().subscribe((loc: any) => {
      this.store.dispatch(new JourneyMapActions.SetMapCenterAction(`${loc.location.lat}, ${loc.location.lng}`));
      placeSubscription.unsubscribe();
    });
  }

  planJourney() {
    this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.FROM_INPUT));
  }
}
