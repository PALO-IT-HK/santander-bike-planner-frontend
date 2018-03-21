import { Component, OnInit } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  pos: google.maps.LatLngLiteral;
  hoverMarker = {
    lat: null,
    lng: null,
  };

  constructor() { }

  ngOnInit() {
  }

  onMapClick($event) {
    console.log({
      $event: $event,
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
    });
    this.pos = {
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
    };
  }

  onMarkerOver({ target: targetMarker }) {
    this.hoverMarker = {
      lat: targetMarker.getPosition().lat(),
      lng: targetMarker.getPosition().lng(),
    };
    targetMarker.nguiMapComponent.openInfoWindow('bikepoint-info', targetMarker);
  }

  onMarkerOut({ target: targetMarker }) {
    this.hoverMarker = {
      lat: null,
      lng: null,
    };
    targetMarker.nguiMapComponent.closeInfoWindow('bikepoint-info');
  }
}
