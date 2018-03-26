import { Action } from '@ngrx/store';

import { AppState } from './models';

import { BikePoint, MapLocation } from '../models';

export namespace AppControlActions {
  export const SET_APP_STATE = '[AppCtrl] Set State';
  export const SET_FROM_FIELD = '[AppCtrl] Set From Field';
  export const SET_TO_FIELD = '[AppCtrl] Set To Field';
  export const SELECT_FROM_BIKEPOINT = '[AppCtrl] From Bike point';
  export const SELECT_TO_BIKEPOINT = '[AppCtrl] To Bike point';
  export const SEARCH_PLACE = '[AppCtrl] Search Place';
  export const UPDATE_PLACE_SEARCH_RESULT = '[AppCtrl] Update Place Search Result';
  export const SEARCH_BIKEPOINT = '[AppCtrl] Search Bikepoint';
  export const UPDATE_BIKEPOINT_SEARCH_RESULT = '[AppCtrl] Update Bikepoint Search Result';

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

  export class SelectFromBikepointAction implements Action {
    readonly type = SELECT_FROM_BIKEPOINT;

    constructor(public payload: BikePoint) { }
  }

  export class SelectToBikepointAction implements Action {
    readonly type = SELECT_TO_BIKEPOINT;

    constructor(public payload: BikePoint) { }
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


  export type Actions
    = SetAppStateAction
    | SetFromFieldAction
    | SetToFieldAction
    | SelectFromBikepointAction
    | SelectToBikepointAction
    | SearchPlaceAction
    | UpdatePlaceSearchResultAction
    | SearchBikepointAction
    | UpdateBikepointSearchResultAction
    ;
}
