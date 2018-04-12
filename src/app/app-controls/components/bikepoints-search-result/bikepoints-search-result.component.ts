import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { BikePoint, BikePointIdOccupancy, AppState } from '../../../models';

@Component({
  selector: 'app-bikepoints-search-result',
  templateUrl: './bikepoints-search-result.component.html',
  styleUrls: ['./bikepoints-search-result.component.scss']
})
export class BikepointsSearchResultComponent implements OnInit {
  @Input() appState: AppState;
  @Input() bikepoints: BikePoint[];
  @Input() bikepointOccupancies: any;
  @Output() select = new EventEmitter<BikePoint>();

  constructor() { }

  ngOnInit() {
  }

  // Proxy the click event as component output
  selectBikepoint(bikepoint: BikePoint) {
    this.select.emit(bikepoint);
  }
}
