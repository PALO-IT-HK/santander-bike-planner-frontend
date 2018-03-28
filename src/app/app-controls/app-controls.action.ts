import { Action } from '@ngrx/store';

import { AppState, BikePoint, MapLocation, Journey } from '../models';

export namespace AppControlActions {
  export const SET_APP_STATE = '[AppCtrl] Set State';
  export const RESET_APP_STATE = '[AppCtrl] Reset State';
  export const SET_FROM_FIELD = '[AppCtrl] Set From Field';
  export const SET_TO_FIELD = '[AppCtrl] Set To Field';
  export const SEARCH_PLACE = '[AppCtrl] Search Place';
  export const UPDATE_PLACE_SEARCH_RESULT = '[AppCtrl] Update Place Search Result';
  export const SEARCH_BIKEPOINT = '[AppCtrl] Search Bikepoint';
  export const UPDATE_BIKEPOINT_SEARCH_RESULT = '[AppCtrl] Update Bikepoint Search Result';
  export const QUERY_JOURNEY = '[AppCtrl] Query Journey';
  export const TOGGLE_DISPLAY_SEARCH_RESULT = '[AppCtrl] Toggle Search Results Display';

  export class SetAppStateAction implements Action {
    readonly type = SET_APP_STATE;

    constructor(public payload: AppState) { }
  }

  export class ResetAppStateAction implements Action {
    readonly type = RESET_APP_STATE;

    constructor(public payload?: any) { }
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

  export class UpdatePlaceSearchResultAction implements Action {
    readonly type = UPDATE_PLACE_SEARCH_RESULT;

    constructor(public payload: MapLocation[]) { }
  }

  export class SearchBikepointAction implements Action {
    readonly type = SEARCH_BIKEPOINT;

    constructor(public payload: string) { }
  }

  export class UpdateBikepointSearchResultAction implements Action {
    readonly type = UPDATE_BIKEPOINT_SEARCH_RESULT;

    constructor(public payload: BikePoint[]) { }
  }

  export class QueryJourneyAction implements Action {
    readonly type = QUERY_JOURNEY;

    constructor(public payload: {
      start: BikePoint,
      end: BikePoint
    }) {}
  }

  export class ToggleDisplaySearchResultAction implements Action {
    readonly type = TOGGLE_DISPLAY_SEARCH_RESULT;

    constructor(public payload: boolean) { }
  }

  export type Actions
    = SetAppStateAction
    | ResetAppStateAction
    | SetFromFieldAction
    | SetToFieldAction
    | SearchPlaceAction
    | UpdatePlaceSearchResultAction
    | SearchBikepointAction
    | UpdateBikepointSearchResultAction
    | QueryJourneyAction
    | ToggleDisplaySearchResultAction
    ;
}
