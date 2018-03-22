import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Location, BikePoint } from '../../../models';
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
    private store: Store<JourneyMapReducer.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new JourneyMapActions.PopulateBikepointsAction([
      { commonName: 'test1', id: 'BikePoint_1', lat: 51.497615025884286, lng: -0.15694431074211934 },
      { commonName: 'test2', id: 'BikePoint_2',  lat: 51.49753487532999, lng: -0.11797717817375997 },
      { commonName: 'test3', id: 'BikePoint_3',  lat: 51.49379435936723, lng: -0.12510112531731465 },
      { commonName: 'test4', id: 'BikePoint_4',  lat: 51.49382107842683, lng: -0.14072231062004903 },
      { commonName: 'test5', id: 'BikePoint_5',  lat: 51.49101549166065, lng: -0.14269641645500997 },
      { commonName: 'test6', id: 'BikePoint_6',  lat: 51.501996375066284, lng: -0.12630275495598653 },
    ]));
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
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      // Emit action so we can debounce it easily in side effects for boundary query
      this.store.dispatch(new JourneyMapActions.UpdateMapBoundaryAction({
        ne: {
          lat: northEast.lat(),
          lng: northEast.lng(),
        },
        sw: {
          lat: southWest.lat(),
          lng: southWest.lng(),
        }
      }));
    }
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
    const targetMarker = $event.target;
    this.store.dispatch(new JourneyMapActions.SetBikepointInfoAction(null));
    targetMarker.nguiMapComponent.closeInfoWindow(this.infoWindowId);
  }
}
