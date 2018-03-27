import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { RootReducer } from './reducers';
import { AppState, BikePoint } from './models';
import { AppControlActions, AppControlReducer } from './app-controls';

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
