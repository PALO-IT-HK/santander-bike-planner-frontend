import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { BikePointIdOccupancy } from '../models';

export namespace BikepointsOccupancyActions {
  export const OBTAIN_BIKEPOINT_OCCUPANCY = '[Occupancy] Obtain bikepoint occupancy';
  export const UPSERT_BIKEPOINT_OCCUPANCY = '[Occupancy] Upsert bikepoint occupancy';
  export const CLEAR_BIKEPOINT_OCCUPANCY = '[Occupancy] clear bikepoint occupancy';

  export class ObtainBikepointOccupancyAction implements Action {
    readonly type = OBTAIN_BIKEPOINT_OCCUPANCY;

    constructor(public payload: string) { }
  }

  export class UpsertBikepointOccupancyAction implements Action {
    readonly type = UPSERT_BIKEPOINT_OCCUPANCY;

    constructor(public payload: Update<BikePointIdOccupancy>) { }
  }

  export class ClearBikepointOccupancyAction implements Action {
    readonly type = CLEAR_BIKEPOINT_OCCUPANCY;

    constructor(public payload?: any) {}
  }

  export type Actions
    = ObtainBikepointOccupancyAction
    | UpsertBikepointOccupancyAction
    | ClearBikepointOccupancyAction
    ;
}
