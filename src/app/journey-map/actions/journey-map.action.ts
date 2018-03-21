import { Action } from '@ngrx/store';
import { LatLong } from '../../models';

export namespace JourneyMapActions {
  export const SELECT_POINT_ACTION = '[JourneyMap] Select Point';

  export class SelectPointAction implements Action {
    readonly type = SELECT_POINT_ACTION;

    constructor(public payload: LatLong) {

    }
  }

  export type Actions
    = SelectPointAction
    ;
}
