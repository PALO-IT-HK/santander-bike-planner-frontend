import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { BikePoint } from '../../../models';

@Component({
  selector: 'app-bikepoints-search-result',
  templateUrl: './bikepoints-search-result.component.html',
  styleUrls: ['./bikepoints-search-result.component.scss']
})
export class BikepointsSearchResultComponent implements OnInit {
  @Input() bikepoints: BikePoint[];
  @Output() select = new EventEmitter<BikePoint>();

  constructor() { }

  ngOnInit() {
  }

  selectBikepoint(bikepoint: BikePoint) {
    this.select.emit(bikepoint);
  }
}
