import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { AppControlActions, AppState, AppControlReducer } from './app-controls';
import { RootReducer } from './reducers';
import { BikePoint } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appState$: Observable<AppState> = this.store.select(AppControlReducer.selectors.appState);
  fromBikepoint$: Observable<BikePoint> = this.store.select(AppControlReducer.selectors.fromLoc);
  toBikepoint$: Observable<BikePoint> = this.store.select(AppControlReducer.selectors.toLoc);

  constructor(
    private store: Store<RootReducer.State>,
  ) { }
}
