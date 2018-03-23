import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { LatLong, Location, BikePoint } from '../../../models';

import { JourneyMapActions } from '../../journey-map.action';
import { JourneyMapReducer } from '../../journey-map.reducer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  mapCenter = '';
  bikepointInfoWindow$: Observable<BikePoint> = this.store.select(JourneyMapReducer.selectors.bikepointInfoWindow);
  bikepoints$: Observable<BikePoint[]> = this.store.select(JourneyMapReducer.selectors.bikepoints);
  displayBikePoints$: Observable<boolean> = this.store.select(JourneyMapReducer.selectors.displayBikepoints);

  // ID for Google Map Info Window
  infoWindowId = 'bikepoint-info';

  constructor(
    private store: Store<JourneyMapReducer.State>,
    private actions$: Actions,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(JourneyMapReducer.selectors.mapCenter).subscribe((center) => {
        this.mapCenter = center;
      }),
      // this.actions$.ofType(JourneyMapActions.GOTO_CURRENT_LOCATION)
      // .filter((action: JourneyMapActions.GotoCurrentLocationAction) => action.payload)
      // .subscribe((action: JourneyMapActions.GotoCurrentLocationAction) => {
      //   // On goto current location action, update mapCenter
      //   this.store.select(JourneyMapReducer.selectors.mapCenter).subscribe((center) => {
      //     this.mapCenter = center;
      //   }).unsubscribe();
      //   this.store.dispatch(new JourneyMapActions.GotoCurrentLocationAction(false));
      // }),
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
   * Event handler for Bikepoint marker hover actions
   */
  onBikepointMarkerOver($event, bikepoint: BikePoint) {
    const targetMarker = $event.target;
    this.store.dispatch(new JourneyMapActions.SetBikepointInfoAction(bikepoint));
    // TODO: add in sideeffect store to populate bikepoint occupancy if occupancy is not found for current info window
    targetMarker.nguiMapComponent.openInfoWindow(this.infoWindowId, targetMarker);
  }

  onBikepointMarkerOut($event) {
    // const targetMarker = $event.target;
    // this.store.dispatch(new JourneyMapActions.SetBikepointInfoAction(null));
    // targetMarker.nguiMapComponent.closeInfoWindow(this.infoWindowId);
  }
}
