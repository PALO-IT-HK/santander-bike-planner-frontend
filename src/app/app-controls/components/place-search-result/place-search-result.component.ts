import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MapLocation, AppState } from '../../../models';

@Component({
  selector: 'app-place-search-result',
  templateUrl: './place-search-result.component.html',
  styleUrls: ['./place-search-result.component.scss']
})
export class PlaceSearchResultComponent implements OnInit {
  @Input() places: MapLocation[];
  @Output() select = new EventEmitter<MapLocation>();

  constructor() { }

  ngOnInit() {
  }

  // Proxy the click event as component output
  selectPlace(place: MapLocation) {
    this.select.emit(place);
  }

}
