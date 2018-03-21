import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bikepoint-info',
  templateUrl: './bikepoint-info.component.html',
  styleUrls: ['./bikepoint-info.component.scss']
})
export class BikepointInfoComponent implements OnInit {
  @Input() lat: number;
  @Input() lng: number;

  constructor() { }

  ngOnInit() {
  }

}
