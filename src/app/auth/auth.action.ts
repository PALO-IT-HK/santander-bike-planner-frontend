import { Action } from '@ngrx/store';

import { GoogleUserInfo } from './models/google-user';

export namespace AuthActions {
  export const SET_USER = '[AUTH] Set User';
  export const RESET_USER = '[AUTH] Reset User';
  export const OBTAIN_COGNITO_DATA = '[AUTH] Obtain User Data';
  export const UPDATE_COGNITO_DATA = '[AUTH] Update User Data';

  export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public payload: GoogleUserInfo) {}
  }

  export class ResetUserAction implements Action {
    readonly type = RESET_USER;

    constructor() {}
  }

  export class ObtainCognitoDataAction implements Action {
    readonly type = OBTAIN_COGNITO_DATA;

    constructor() {}
  }

  export class UpdateCognitoDataAction implements Action {
    readonly type = UPDATE_COGNITO_DATA;

    constructor(public payload: any) { }
  }

  export type Actions
    = SetUserAction
    | ResetUserAction
    | ObtainCognitoDataAction
    | UpdateCognitoDataAction
    ;
}
