import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../models';
import { PlaceService } from '../../../bikepoints/services/place.service';
import { JourneyMapActions } from '../../../journey-map/journey-map.action';

import { AppControlActions } from '../../app-controls.action';
import { AppControlReducer } from '../../app-controls.reducer';

@Component({
  selector: 'app-map-search-box',
  templateUrl: './map-search-box.component.html',
  styleUrls: ['./map-search-box.component.scss']
})
export class MapSearchBoxComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  searchField = new FormControl('');

  constructor(
    private store: Store<AppControlReducer.State>
  ) { }

  ngOnInit() {
    /* Handle search field interaction */
    this.subscriptions.push(
      /**
       * On field change,
       *  update state store and reset `from` bikepoint;
       *  search for bikepoints and places.
       */
      this.searchField.valueChanges
        .debounceTime(200)
        .do((value) => {
          this.store.dispatch(new AppControlActions.SetFromFieldAction(value));
          this.store.dispatch(new JourneyMapActions.SelectFromBikepointAction(null));
        })
        .debounceTime(2000)
        .subscribe((value) => {
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

  planJourney() {
    this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.FROM_INPUT));
  }
}
