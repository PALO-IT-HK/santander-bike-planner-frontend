import { Action } from '@ngrx/store';
import { LatLong, BikePoint } from '../models';

export namespace JourneyMapActions {
  export const SET_POINT_ACTION = '[JourneyMap] Select Point';
  export const SET_MAP_CENTER_ACTION = '[JourneyMap] Set Map Center';
  export const SET_BIKEPOINT_INFO_WINDOW = '[JourneyMap] Toggle Bikepoint Info Window';
  export const TOGGLE_BIKEPOINTS = '[JourneyMap] Toggle Bikepoints display';
  export const POPULATE_BIKEPOINTS = '[JourneyMap] Populate Bikepoints';
  export const UPDATE_MAP_BOUNDARY = '[JourneyMap] Update Map Boundary';
  export const GOTO_CURRENT_LOCATION = '[JourneyMap] Goto current location';

  export class SetPointAction implements Action {
    readonly type = SET_POINT_ACTION;

    constructor(public payload: LatLong) {}
  }

  export class SetMapCenterAction implements Action {
    readonly type = SET_MAP_CENTER_ACTION;

    constructor(public payload?: string) {}
  }

  export class SetBikepointInfoAction implements Action {
    readonly type = SET_BIKEPOINT_INFO_WINDOW;

    constructor(public payload: BikePoint | null) { }
  }

  export class ToggleBikepointsAction implements Action {
    readonly type = TOGGLE_BIKEPOINTS;

    constructor(public payload: boolean) { }
  }

  export class PopulateBikepointsAction implements Action {
    readonly type = POPULATE_BIKEPOINTS;

    constructor(public payload: BikePoint[]) {}
  }

  export class UpdateMapBoundaryAction implements Action {
    readonly type = UPDATE_MAP_BOUNDARY;

    constructor(public payload: {
      ne: LatLong,
      sw: LatLong,
    }) {}
  }

  export class GotoCurrentLocationAction implements Action {
    readonly type = GOTO_CURRENT_LOCATION;

    constructor(public payload: boolean) {}
  }

  export type Actions
    = SetPointAction
    | SetMapCenterAction
    | SetBikepointInfoAction
    | ToggleBikepointsAction
    | PopulateBikepointsAction
    | UpdateMapBoundaryAction
    | GotoCurrentLocationAction
    ;
}
