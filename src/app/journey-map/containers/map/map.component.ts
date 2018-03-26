import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { LatLong, MapLocation, BikePoint } from '../../../models';
import { AppState, AppControlActions, AppControlReducer } from '../../../app-controls';

import { JourneyMapActions } from '../../journey-map.action';
import { JourneyMapReducer } from '../../journey-map.reducer';
import { RootReducer } from '../../../reducers';
import { NguiMapComponent } from '@ngui/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() appState: AppState;
  @Input() fromLoc: BikePoint;
  @Input() toLoc: BikePoint;
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;

  subscriptions: Subscription[] = [];

  /**
   * Work around for custom map marker with info window
   * See: https://github.com/ng2-ui/map/issues/154
   */
  customMapMarkers: {
    [index: string]: any,
  } = {};

  infoWindowOffset = {
    height: -54,
    width: 0,
  };

  bikepointInfoWindow$: Observable<BikePoint> = this.store.select(JourneyMapReducer.selectors.bikepointInfoWindow);
  bikepoints$: Observable<BikePoint[]> = this.store.select(JourneyMapReducer.selectors.bikepoints);

  mapCenter = '';

  // ID for Google Map Info Window
  infoWindowId = 'bikepoint-info';

  constructor(
    private store: Store<RootReducer.State>,
    private actions$: Actions,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(JourneyMapReducer.selectors.mapCenter).subscribe((center) => {
        this.mapCenter = center;
      }),
    );
    this.store.dispatch(new JourneyMapActions.PopulateBikepointsAction([]));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  /**
   * Event handler for Map
   */
  onMapClick($event) {
    console.log({
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
    });
  }

  onCenterChanged($event) {
    /**
     * Reset center position in observable such that we can reposition to current
     * position next time even if the current position is not changed
     */
    // this.mapCenter = ''; // disabled due to exceptions
  }

  onBoundsChanged($event) {
    const bounds: google.maps.LatLngBounds = $event.target.getBounds();
    if (bounds) {
      const northEast: LatLong = {
        lat: bounds.getNorthEast().lat(),
        lng: bounds.getNorthEast().lng(),
      };
      const southWest: LatLong = {
        lat: bounds.getSouthWest().lat(),
        lng: bounds.getSouthWest().lng(),
      };

      // Emit action so we can debounce it easily in side effects for boundary query
      this.store.dispatch(new JourneyMapActions.UpdateMapBoundaryAction({
        ne: northEast,
        sw: southWest
      }));
    }
  }

  onMapDragend($event) {
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

  onBikepointMarkerOut($event) {
    // const targetMarker = $event.target;
    // this.store.dispatch(new JourneyMapActions.SetBikepointInfoAction(null));
    // targetMarker.nguiMapComponent.closeInfoWindow(this.infoWindowId);
  }

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
        this.store.dispatch(new AppControlActions.SelectFromBikepointAction(bikepoint));
        break;
      /**
       * If we are at `to input` state, clicking on bikepoint marker would means
       * that we are going to use that as `To` point
       */
      case AppState.TO_INPUT:
        this.store.dispatch(new AppControlActions.SelectToBikepointAction(bikepoint));
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
