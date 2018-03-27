import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NguiMapComponent } from '@ngui/map';

import { Store, select } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AppState, LatLong, MapLocation, BikePoint, Journey } from '../../../models';

import { JourneyMapActions } from '../../journey-map.action';
import { JourneyMapReducer } from '../../journey-map.reducer';

@Component({
  selector: 'app-journey-map',
  templateUrl: './journey-map.component.html',
  styleUrls: ['./journey-map.component.scss']
})
export class JourneyMapComponent implements OnInit, OnDestroy {
  @Input() appState: AppState;

  subscriptions: Subscription[] = [];

  mapBoundaryChange: Subject<google.maps.LatLngBounds> = new Subject<google.maps.LatLngBounds>();

  /**
   * Observables for Journey Map
   */
  mapCenter$: Observable<string> = this.store.select(JourneyMapReducer.selectors.mapCenter);
  bikepointInfoWindow$: Observable<BikePoint> = this.store.select(JourneyMapReducer.selectors.bikepointInfoWindow);
  bikepoints$: Observable<BikePoint[]> = this.store.select(JourneyMapReducer.selectors.bikepoints);
  fromLoc$: Observable<BikePoint> = this.store.select(JourneyMapReducer.selectors.fromLoc);
  toLoc$: Observable<BikePoint> = this.store.select(JourneyMapReducer.selectors.toLoc);
  journey$: Observable<Journey> = this.store.select(JourneyMapReducer.selectors.journey);

  /**
   * Work around for custom map marker with info window
   * See: https://github.com/ng2-ui/map/issues/154
   */
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  customMapMarkers: {
    [index: string]: any,
  } = {};
  infoWindowOffset = {
    height: -54,
    width: 0,
  };

  // ID for Google Map Info Window
  infoWindowId = 'bikepoint-info';

  constructor(
    private store: Store<JourneyMapReducer.State>,
  ) { }

  ngOnInit() {
    this.mapCenter$.subscribe((value) => console.log(value));
    this.subscriptions.push(
      this.mapBoundaryChange.asObservable()
        .debounceTime(500)
        .filter(value => Boolean(value))
        .subscribe((bounds) => {
          this.store.dispatch(new JourneyMapActions.UpdateMapBoundaryAction({
            ne: {
              lat: bounds.getNorthEast().lat(),
              lng: bounds.getNorthEast().lng(),
            },
            sw: {
              lat: bounds.getSouthWest().lat(),
              lng: bounds.getSouthWest().lng(),
            }
          }));
        }),
    );
  }

  ngOnDestroy() {
    this.mapBoundaryChange.complete();
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  /**
   * Event handler for Map
   */
  onBoundsChanged($event) {
    this.mapBoundaryChange.next($event.target.getBounds());
  }

  /**
   * Event handler for Bikepoint marker hover and click actions
   */
  onBikepointMarkerOver($event, bikepoint: BikePoint) {
    const targetMarker = $event.target;
    this.store.dispatch(new JourneyMapActions.SetBikepointInfoAction(bikepoint));
    targetMarker.nguiMapComponent.openInfoWindow(this.infoWindowId, targetMarker);
  }

  /**
   * Event handler for Custom Bikepoint marker hover and click actions
   */
  onBikepointCustomMarkerOver(bikepoint: BikePoint, index) {
    this.store.dispatch(new JourneyMapActions.SetBikepointInfoAction(bikepoint));
    this.nguiMapComponent.openInfoWindow(this.infoWindowId, this.customMapMarkers[index]);
  }

  /**
   * DEBT: There seems to be a memory leak in this work around for custom map
   *   marker with info window
   */
  onBikepointMarkerInit(customMarker, index) {
    this.customMapMarkers[index] = customMarker;
  }

  onBikepointMarkerClick($event, bikepoint: BikePoint) {
    switch (this.appState) {
      /**
       * If we are at `normal` app state or in `from input` state, clicking on
       * bikepoint marker would means that we are going to use that as `From`
       * point
       */
      case AppState.NORMAL:
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
      /**
       * Bikepoint marker should not even visible or available for selection if
       * we are confirming a journey or in a journey.
       */
      case AppState.CONFIRM_JOURNEY:
      case AppState.IN_JOURNEY:
      default:
        return;
    }
  }
}
