import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { LatLong, Location, BikePoint } from '../../../models';

import { JourneyMapActions } from '../../journey-map.action';
import { JourneyMapReducer } from '../../journey-map.reducer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  mapCenter$: Observable<string> = this.store.select(JourneyMapReducer.selectors.mapCenter);
  bikepointInfoWindow$: Observable<BikePoint> = this.store.select(JourneyMapReducer.selectors.bikepointInfoWindow);
  bikepoints$: Observable<BikePoint[]> = this.store.select(JourneyMapReducer.selectors.bikepoints);

  // ID for Google Map Info Window
  infoWindowId = 'bikepoint-info';

  constructor(
    private store: Store<JourneyMapReducer.State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new JourneyMapActions.PopulateBikepointsAction([]));
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
    this.store.dispatch(new JourneyMapActions.PopulateBikepointsAction([]));
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
