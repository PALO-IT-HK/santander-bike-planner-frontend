import { Action } from '@ngrx/store';
import { LatLong, BikePoint, MapBoundary, Journey } from '../models';

export namespace JourneyMapActions {
  export const RESET_MAP_STATE_ACTION = '[JourneyMap] Reset Map State';
  export const SET_MAP_CENTER_ACTION = '[JourneyMap] Set Map Center';
  export const SET_MAP_ZOOM_ACTION = '[JourneyMap] Set Map Zoom';
  export const UPDATE_MAP_BOUNDARY = '[JourneyMap] Update Map Boundary';
  export const GOTO_CURRENT_LOCATION = '[JourneyMap] Goto current location';
  export const FETCH_BIKEPOINTS = '[JourneyMap] Fetch Bikepoints by boundary';
  export const POPULATE_BIKEPOINTS = '[JourneyMap] Populate Bikepoints';
  export const SET_BIKEPOINT_INFO_WINDOW = '[JourneyMap] Toggle Bikepoint Info Window';
  export const SELECT_FROM_BIKEPOINT = '[JourneyMap] From Bikepoint';
  export const SELECT_TO_BIKEPOINT = '[JourneyMap] To Bikepoint';
  export const TOGGLE_AUTO_FETCH_BIKEPOINT = '[JourneyMap] Toggle Bikepoint Auto Fetch';
  export const UPDATE_JOURNEY = '[JourneyMap] Update Journey';
  export const SET_MAP_LOADING = '[JourneyMap] Set Loading State';

  export class ResetMapStateAction implements Action {
    readonly type = RESET_MAP_STATE_ACTION;

    constructor(public payload?: any) {}
  }

  export class SetMapCenterAction implements Action {
    readonly type = SET_MAP_CENTER_ACTION;

    constructor(public payload?: string | LatLong) {}
  }

  export class SetMapZoomAction implements Action {
    readonly type = SET_MAP_ZOOM_ACTION;

    constructor(public payload: number) { }
  }

  export class UpdateMapBoundaryAction implements Action {
    readonly type = UPDATE_MAP_BOUNDARY;

    constructor(public payload: MapBoundary) { }
  }

  export class GotoCurrentLocationAction implements Action {
    readonly type = GOTO_CURRENT_LOCATION;

    constructor(public payload: boolean) { }
  }

  export class FetchBikepointsAction implements Action {
    readonly type = FETCH_BIKEPOINTS;

    constructor(public payload: MapBoundary) { }
  }

  export class PopulateBikepointsAction implements Action {
    readonly type = POPULATE_BIKEPOINTS;

    constructor(public payload: BikePoint[]) {}
  }

  export class SetBikepointInfoAction implements Action {
    readonly type = SET_BIKEPOINT_INFO_WINDOW;

    constructor(public payload: BikePoint | null) { }
  }

  export class SelectFromBikepointAction implements Action {
    readonly type = SELECT_FROM_BIKEPOINT;

    constructor(public payload: BikePoint | null) { }
  }

  export class SelectToBikepointAction implements Action {
    readonly type = SELECT_TO_BIKEPOINT;

    constructor(public payload: BikePoint | null) { }
  }

  export class ToggleAutoFetchBikePointAction implements Action {
    readonly type = TOGGLE_AUTO_FETCH_BIKEPOINT;

    constructor(public payload: boolean) { }
  }

  export class SetJourneyAction implements Action {
    readonly type = UPDATE_JOURNEY;

    constructor(public payload: Journey | null) { }
  }

  export class SetMapLoadingAction implements Action {
    readonly type = SET_MAP_LOADING;

    constructor(public payload: boolean) { }
  }

  export type Actions
    = ResetMapStateAction
    | SetMapCenterAction
    | SetMapZoomAction
    | UpdateMapBoundaryAction
    | GotoCurrentLocationAction
    | FetchBikepointsAction
    | PopulateBikepointsAction
    | SetBikepointInfoAction
    | SelectFromBikepointAction
    | SelectToBikepointAction
    | SetJourneyAction
    | ToggleAutoFetchBikePointAction
    | SetMapLoadingAction
    ;
}
