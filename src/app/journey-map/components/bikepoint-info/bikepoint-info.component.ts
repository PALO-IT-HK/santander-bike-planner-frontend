import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

import { BikePoint } from '../../../models';

@Component({
  selector: 'app-bikepoint-info',
  templateUrl: './bikepoint-info.component.html',
  styleUrls: ['./bikepoint-info.component.scss']
})
export class BikepointInfoComponent implements OnChanges {
  @Input() info: BikePoint;
  @Input() homePoint: string;
  @Input() workPoint: string;
  @Input() favPoints: string[];
  isHome = false;
  isWork = false;
  isFav = false;

  @Output() toggleHome = new EventEmitter<string>();
  @Output() toggleWork = new EventEmitter<string>();
  @Output() toggleFav = new EventEmitter<{id: string, status: boolean}>();

  constructor() { }

  ngOnChanges() {
    // It is favourite point if it can be found in the array.
    if (this.info) {
      this.isHome = this.homePoint === this.info.id;
      this.isWork = this.workPoint === this.info.id;
      this.isFav = this.favPoints.findIndex((favId) => favId === this.info.id) !== -1;
    }
  }

  setHome(id) {
    this.toggleHome.emit(this.isHome ? undefined : id);
  }

  setWork(id) {
    this.toggleWork.emit(this.isWork ? undefined : id);
  }

  setFav(id) {
    this.toggleFav.emit({id, status: !this.isFav});
  }
}
