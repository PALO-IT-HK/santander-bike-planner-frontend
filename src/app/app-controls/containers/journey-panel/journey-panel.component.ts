import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState, BikePoint, MapLocation, Journey, BikePointIdOccupancy } from '../../../models';
import { RootReducer } from '../../../reducers';
import { AppControlReducer } from '../../app-controls.reducer';
import { AppControlActions } from '../../app-controls.action';
import { JourneyMapActions } from '../../../journey-map/journey-map.action';
import { JourneyMapReducer } from '../../../journey-map/journey-map.reducer';
import { BikepointsOccupancyReducer } from '../../../bikepoints/bikepoints.reducer';

@Component({
  selector: 'app-journey-panel',
  templateUrl: './journey-panel.component.html',
  styleUrls: ['./journey-panel.component.scss']
})
export class JourneyPanelComponent implements OnInit, OnDestroy {
  readonly neighbourhoodZoomLevel = 16;

  @Input() appState: AppState;
  @Input() journey: Journey;
  subscriptions: Subscription[] = [];

  haveSearchResults$: Observable<boolean> = this.store.select(AppControlReducer.selectors.haveSearchResults);
  displaySearchResults$: Observable<boolean> = this.store.select(AppControlReducer.selectors.displaySearchResults);
  bikeSearchResults$: Observable<BikePoint[]> = this.store.select(AppControlReducer.selectors.bikepointSearchResults);
  placeSearchResults$: Observable<MapLocation[]> = this.store.select(AppControlReducer.selectors.placeSearchResults);
  bikeOccupanciesResults$ = this.store.select(BikepointsOccupancyReducer.selectors.allOccupancy);

  fromField = new FormControl('');
  toField = new FormControl('');

  constructor(
    private store: Store<RootReducer.State>,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      /**
       * Subscribe `from` reactive form state change for,
       *   updating redux store;
       *   searching bikepoint and place;
       *   update reactive form field.
       */
      this.fromField.valueChanges
        .debounceTime(200)
        .do((value) => {
          this.store.dispatch(new AppControlActions.SetFromFieldAction(value));
          this.store.dispatch(new JourneyMapActions.SelectFromBikepointAction(null));
        })
        .debounceTime(2000)
        .subscribe((value) => {
          if (value) {
            this.store.dispatch(new AppControlActions.SearchBikepointAction(value));
            this.store.dispatch(new AppControlActions.SearchPlaceAction(value));
          }
        }),
      this.store.select(AppControlReducer.selectors.fromField)
        .subscribe((value) => this.fromField.setValue(
          value,
          { emitEvent: false },
        )),

      /**
       * Subscribe `to` reactive form state change for,
       *   updating redux store;
       *   searching bikepoint and place;
       *   update reactive form field.
       */
      this.toField.valueChanges
        .debounceTime(200)
        .do((value) => {
          this.store.dispatch(new AppControlActions.SetToFieldAction(value));
          this.store.dispatch(new JourneyMapActions.SelectToBikepointAction(null));
        })
        .debounceTime(2000)
        .subscribe((value) => {
          if (value) {
            this.store.dispatch(new AppControlActions.SearchBikepointAction(value));
            this.store.dispatch(new AppControlActions.SearchPlaceAction(value));
          }
        }),
      this.store.select(AppControlReducer.selectors.toField)
        .subscribe((value) => this.toField.setValue(
          value,
          { emitEvent: false },
        )),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  closePanel() {
    this.store.dispatch(new AppControlActions.ResetAppStateAction());
    this.store.dispatch(new JourneyMapActions.ResetMapStateAction());
  }

  confirmJourney() {
    // this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.IN_JOURNEY));
  }

  /**
   * When the from-field have focus, make sure the app is in `From_Input` mode
   */
  fromFieldOnFocus() {
    const fromSubs = Observable.of(true)
      .delay(200)
      .switchMap(() => this.store.select(JourneyMapReducer.selectors.fromLoc))
      .subscribe((fromLoc: BikePoint[]) => {
        if (fromLoc[0]) {
          this.store.dispatch(new JourneyMapActions.SetMapCenterAction({
            lat: fromLoc[0].lat,
            lng: fromLoc[0].lng,
          }));
          this.store.dispatch(new JourneyMapActions.SetMapZoomAction(this.neighbourhoodZoomLevel));
        }
        this.store.dispatch(new AppControlActions.ToggleDisplaySearchResultAction(true));
        this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.FROM_INPUT));
        fromSubs.unsubscribe();
      });
  }

  /**
   * When the to-field have focus, make sure the app is in `To_Input` mode
   */
  toFieldOnFocus() {
    const toSubs = Observable.of(true)
      .delay(200)
      .switchMap(() => this.store.select(JourneyMapReducer.selectors.toLoc))
      .subscribe((toLoc: BikePoint[]) => {
        if (toLoc[0]) {
          this.store.dispatch(new JourneyMapActions.SetMapCenterAction({
            lat: toLoc[0].lat,
            lng: toLoc[0].lng,
          }));
          this.store.dispatch(new JourneyMapActions.SetMapZoomAction(this.neighbourhoodZoomLevel));
        }
        this.store.dispatch(new AppControlActions.ToggleDisplaySearchResultAction(true));
        this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.TO_INPUT));
        toSubs.unsubscribe();
      });
  }

  /**
   * When either of the field on blur, check if both `from` and `to` endpoints
   * are selected.  Switch to confirm journey and get journey path if so.
   */
  fieldOnBlur() {
    const onBlur = Observable.of(true)
      .delay(200)
      .switchMap(() => this.store.select(JourneyMapReducer.selectors.fromLoc))
      .withLatestFrom(this.store.select(JourneyMapReducer.selectors.toLoc))
      .subscribe(([fromLoc, toLoc]) => {
        if (fromLoc.length > 0 && toLoc.length > 0) {
          this.store.dispatch(new AppControlActions.SetAppStateAction(AppState.CONFIRM_JOURNEY));
        }
        onBlur.unsubscribe();
      });
  }

  selectPlace(place: MapLocation) {
    this.store.dispatch(new JourneyMapActions.SetMapCenterAction(place.commonName));
    this.store.dispatch(new JourneyMapActions.SetMapZoomAction(this.neighbourhoodZoomLevel));
    this.store.dispatch(new AppControlActions.ToggleDisplaySearchResultAction(false));
  }

  selectBikePoint(bikepoint: BikePoint) {
    switch (this.appState) {
      /**
       * If we are at `normal` app state or in `from input` state, clicking on
       * bikepoint marker would means that we are going to use that as `From`
       * point
       */
      case AppState.FROM_INPUT:
        this.store.dispatch(new JourneyMapActions.SelectFromBikepointAction(bikepoint));
        break;
      /**
       * If we are at `to input` state, clicking on bikepoint marker would means
       * that we are going to use that as `To` point
       */
      case AppState.TO_INPUT:
        this.store.dispatch(new JourneyMapActions.SelectToBikepointAction(bikepoint));
        break;
      default:
        return;
    }
  }
}
