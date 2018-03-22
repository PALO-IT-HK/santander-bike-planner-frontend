import { Action, UPDATE } from '@ngrx/store';
import { LatLong, BikePoint } from '../models';

export namespace JourneyMapActions {
  export const SET_POINT_ACTION = '[JourneyMap] Select Point';
  export const SET_BIKEPOINT_INFO_WINDOW = '[JourneyMap] Toggle Bikepoint Info Window';
  export const UPDATE_MAP_BOUNDARY = '[JourneyMap] Update Map Boundary';
  export const POPULATE_BIKEPOINTS = '[JourneyMap] Populate Bikepoints';

  export class SetPointAction implements Action {
    readonly type = SET_POINT_ACTION;

    constructor(public payload: LatLong) {}
  }

  export class SetBikepointInfoAction implements Action {
    readonly type = SET_BIKEPOINT_INFO_WINDOW;

    constructor(public payload: BikePoint | null) {}
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

  export type Actions
    = SetPointAction
    | SetBikepointInfoAction
    | PopulateBikepointsAction
    | UpdateMapBoundaryAction
    ;
}
