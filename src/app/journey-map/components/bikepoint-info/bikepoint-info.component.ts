import { Component, OnInit, Input } from '@angular/core';

import { BikePoint } from '../../../models';

@Component({
  selector: 'app-bikepoint-info',
  templateUrl: './bikepoint-info.component.html',
  styleUrls: ['./bikepoint-info.component.scss']
})
export class BikepointInfoComponent implements OnInit {
  @Input() info: BikePoint;

  constructor() { }

  ngOnInit() {
  }

}
