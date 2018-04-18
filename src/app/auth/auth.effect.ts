import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from './auth.action';
import { AWSService } from './services/aws.service';
import { AuthReducer } from './auth.reducer';
import { JourneyPlannerActions } from '../journey-planner/journey-planner.action';

@Injectable()
export class AuthEffects {
  @Effect()
  obtainCognitoData$: Observable<Action> = this.actions$
    .ofType(AuthActions.OBTAIN_COGNITO_DATA)
    .switchMap(() => {
      return Observable.fromPromise(this.awsService.obtainCognitoUserData('journeyPlannerUserData'));
    })
    .switchMap((journeyPlannerUserData) => {
      // console.log({ journeyPlannerUserData });
      return [
        new JourneyPlannerActions.LoadStateAction(journeyPlannerUserData),
      ];
    });

  @Effect()
  updateCognitoData$: Observable<Action> = this.actions$
    .ofType(AuthActions.UPDATE_COGNITO_DATA)
    .switchMap((action: AuthActions.UpdateCognitoDataAction) => {
      return Observable.fromPromise(this.awsService.updateCognitoUserData('journeyPlannerUserData', action.payload));
    })
    .switchMap((results) => {
      // console.log({ updateResults: results });
      return [];
    });

  constructor(
    private actions$: Actions,
    private store: Store<AuthReducer.State>,
    private awsService: AWSService
  ) {}
}
