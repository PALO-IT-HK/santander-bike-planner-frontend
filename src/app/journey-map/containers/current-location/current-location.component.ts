import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { PlaceService } from '../../../bikepoints/services/place.service';
import { JourneyMapReducer } from '../../journey-map.reducer';
import { JourneyMapActions } from '../../journey-map.action';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss']
})
export class CurrentLocationComponent implements OnInit {

  constructor(
    private store: Store<JourneyMapReducer.State>,
    private placeService: PlaceService
  ) { }

  ngOnInit() {
  }

  gotoCurrentLoc() {
    const placeSubscription = this.placeService.getCurrentLocationFromGoogle().subscribe((loc: any) => {
      this.store.dispatch(new JourneyMapActions.SetMapCenterAction(`${loc.location.lat}, ${loc.location.lng}`));
      placeSubscription.unsubscribe();
    });
  }
}
