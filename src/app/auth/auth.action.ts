import { Action } from '@ngrx/store';

import { GoogleUserInfo } from './models/google-user';

export namespace AuthActions {
  export const SET_USER = '[AUTH] Set User';
  export const RESET_USER = '[AUTH] Reset User';

  export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public payload: GoogleUserInfo) {}
  }

  export class ResetUserAction implements Action {
    readonly type = RESET_USER;

    constructor() {}
  }

  export type Actions
    = SetUserAction
    | ResetUserAction
    ;
}
