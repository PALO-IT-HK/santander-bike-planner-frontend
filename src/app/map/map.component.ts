import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  pos: google.maps.LatLngLiteral;

  constructor() { }

  ngOnInit() {
  }

  onMapClick($event) {
    console.log({
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
    });
    this.pos = {
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
    };
  }
}
