import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AWSService } from '../auth/services/aws.service';
import { JourneyPlannerActions } from './journey-planner.action';
import { JourneyPlannerReducer } from './journey-planner.reducer';
import { AuthActions } from '../auth/auth.action';

@Injectable()
export class JourneyPlannerEffects {
  @Effect()
  updateUserSetting$: Observable<Action> = this.actions$
    .ofType(
      JourneyPlannerActions.SET_HOME_POINT,
      JourneyPlannerActions.SET_WORK_POINT,
      JourneyPlannerActions.SET_FAV_POINT,
      JourneyPlannerActions.UNSET_FAV_POINT,
    )
    .debounceTime(1000)
    .withLatestFrom(this.store.select(JourneyPlannerReducer.selectors._root))
    .switchMap(([action, state]: [JourneyPlannerActions.Actions, JourneyPlannerReducer.State]) => {
      return [
        new AuthActions.UpdateCognitoDataAction(state),
      ];
    });

  constructor(
    private actions$: Actions,
    private store: Store<JourneyPlannerReducer.State>,
  ) { }
}
