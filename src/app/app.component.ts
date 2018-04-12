import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { RootReducer } from './reducers';
import { GoogleUserInfo } from './auth/models/google-user';
import { AuthReducer } from './auth/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<GoogleUserInfo> = this.store.select(AuthReducer.selectors.user);

  constructor(
    private store: Store<RootReducer.State>,
  ) { }
}
