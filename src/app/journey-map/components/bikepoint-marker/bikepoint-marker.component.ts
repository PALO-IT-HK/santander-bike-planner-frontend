import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BikePoint } from '../../../models';

@Component({
  selector: 'app-bikepoint-marker',
  templateUrl: './bikepoint-marker.component.html',
  styleUrls: ['./bikepoint-marker.component.scss']
})
export class BikepointMarkerComponent implements OnInit {
  @Input() bikepoint: BikePoint;

  constructor() { }

  ngOnInit() {
  }

}
