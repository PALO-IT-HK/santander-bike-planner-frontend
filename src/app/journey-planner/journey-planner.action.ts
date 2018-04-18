import { Action } from '@ngrx/store';

import { BikePoint } from '../models';
import { JourneyPlannerReducer } from './journey-planner.reducer';

export namespace JourneyPlannerActions {
  export const SET_HOME_POINT = '[JourneyPlanner] Set Home Point';
  export const SET_WORK_POINT = '[JourneyPlanner] Set Work Point';
  export const SET_FAV_POINT = '[JourneyPlanner] Set Favorite Point';
  export const UNSET_FAV_POINT = '[JourneyPlanner] Unset Favorite Point';
  export const LOAD_STATE = '[JourneyPlanner] Load Favorite Points';

  export class SetHomePointAction implements Action {
    readonly type = SET_HOME_POINT;

    constructor(public payload: string) { }
  }

  export class SetWorkPointAction implements Action {
    readonly type = SET_WORK_POINT;

    constructor(public payload: string) { }
  }

  export class SetFavPointAction implements Action {
    readonly type = SET_FAV_POINT;

    constructor(public payload: string) { }
  }

  export class UnsetFavPointAction implements Action {
    readonly type = UNSET_FAV_POINT;

    constructor(public payload: string) { }
  }

  export class LoadStateAction implements Action {
    readonly type = LOAD_STATE;

    constructor(public payload: JourneyPlannerReducer.State) { }
  }

  export type Actions
    = SetHomePointAction
    | SetWorkPointAction
    | SetFavPointAction
    | UnsetFavPointAction
    | LoadStateAction
    ;
}
