import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BikePoint, BikePointOccupancy } from '../../../models';
import { Store } from '@ngrx/store';
import { RootReducer } from '../../../reducers';
import { BikepointsOccupancyActions } from '../../../bikepoints/bikepoints.action';
import { BikePointsService } from '../../../bikepoints/services/bikepoints.service';

@Component({
  selector: 'app-bikepoints-search-result-entry',
  templateUrl: './bikepoints-search-result-entry.component.html',
  styleUrls: ['./bikepoints-search-result-entry.component.scss']
})
export class BikepointsSearchResultEntryComponent implements OnInit {
  @Input() bikepoint: BikePoint;
  @Input() occupancy: BikePointOccupancy;
  @Output() select: EventEmitter<BikePoint> = new EventEmitter<BikePoint>();

  constructor(
    private store: Store<RootReducer.State>,
    private bpServices: BikePointsService,
  ) { }

  ngOnInit() {
    if (!this.occupancy) {
      this.bpServices.fetchOccupancyDetail(this.bikepoint.id).subscribe((result) => {
        this.store.dispatch(new BikepointsOccupancyActions.UpsertBikepointOccupancyAction({
          id: result.id,
          changes: result
        }));
      });
    }
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
