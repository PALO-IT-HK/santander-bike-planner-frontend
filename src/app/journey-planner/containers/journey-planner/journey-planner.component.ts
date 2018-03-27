import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppControlReducer } from '../../../app-controls/app-controls.reducer';
import { JourneyMapReducer } from '../../../journey-map/journey-map.reducer';

@Component({
  selector: 'app-journey-planner',
  templateUrl: './journey-planner.component.html',
  styleUrls: ['./journey-planner.component.scss']
})
export class JourneyPlannerComponent implements OnInit {
  appState$ = this.store.select(AppControlReducer.selectors.appState);
  journey$ = this.journeyStore.select(JourneyMapReducer.selectors.journey);

  constructor(
    private store: Store<AppControlReducer.State>,
    private journeyStore: Store<JourneyMapReducer.State>,
  ) { }

  ngOnInit() { }
}
