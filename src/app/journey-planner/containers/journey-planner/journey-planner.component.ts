import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppControlReducer } from '../../../app-controls/app-controls.reducer';
import { JourneyMapReducer } from '../../../journey-map/journey-map.reducer';
import { AuthReducer } from '../../../auth/auth.reducer';

@Component({
  selector: 'app-journey-planner',
  templateUrl: './journey-planner.component.html',
  styleUrls: ['./journey-planner.component.scss']
})
export class JourneyPlannerComponent implements OnInit {
  appState$ = this.store.select(AppControlReducer.selectors.appState);
  journey$ = this.journeyStore.select(JourneyMapReducer.selectors.journey);
  loading$ = this.journeyStore.select(JourneyMapReducer.selectors.mapLoading);
  user$ = this.store.select(AuthReducer.selectors.user);

  constructor(
    private store: Store<AppControlReducer.State>,
    private journeyStore: Store<JourneyMapReducer.State>,
  ) { }

  ngOnInit() { }
}
