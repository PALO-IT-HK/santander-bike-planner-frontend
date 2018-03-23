import { Action } from '@ngrx/store';

import { AppState } from './models';

export namespace AppControlActions {
  export const SET_APP_STATE = '[AppCtrl] Set State';
  export const SET_FROM_FIELD = '[AppCtrl] Set From Field';
  export const SET_TO_FIELD = '[AppCtrl] Set To Field';
  export const SEARCH_PLACE = '[AppCtrl] Search Place';
  export const SEARCH_BIKEPOINT = '[AppCtrl] Search Bikepoint';

  export class SetAppStateAction implements Action {
    readonly type = SET_APP_STATE;

    constructor(public payload: AppState) { }
  }

  export class SetFromFieldAction implements Action {
    readonly type = SET_FROM_FIELD;

    constructor(public payload: string) { }
  }

  export class SetToFieldAction implements Action {
    readonly type = SET_TO_FIELD;

    constructor(public payload: string) { }
  }

  export class SearchPlaceAction implements Action {
    readonly type = SEARCH_PLACE;

    constructor(public payload: string) { }
  }

  export class SearchBikepointAction implements Action {
    readonly type = SEARCH_BIKEPOINT;

    constructor(public payload: string) { }
  }


  export type Actions
    = SetAppStateAction
    | SetFromFieldAction
    | SetToFieldAction
    | SearchPlaceAction
    | SearchBikepointAction
    ;
}
