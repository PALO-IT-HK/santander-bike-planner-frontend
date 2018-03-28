import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BikePoint, BikePointOccupancy } from '../../../models';

@Component({
  selector: 'app-bikepoints-search-result-entry',
  templateUrl: './bikepoints-search-result-entry.component.html',
  styleUrls: ['./bikepoints-search-result-entry.component.scss']
})
export class BikepointsSearchResultEntryComponent implements OnInit {
  @Input() bikepoint: BikePoint;
  @Input() occupancy: BikePointOccupancy;
  @Output() select: EventEmitter<BikePoint> = new EventEmitter<BikePoint>();

  constructor() { }

  ngOnInit() {
  }

  // Only response to click when occupancy information is loaded from backend
  selectThis() {
    if (this.occupancy) {
      this.select.emit({
        ...this.bikepoint,
        occupancy: this.occupancy,
      });
    }
  }
}
