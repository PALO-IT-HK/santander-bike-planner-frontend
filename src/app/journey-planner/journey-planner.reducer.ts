import { createFeatureSelector, createSelector } from '@ngrx/store';

import { JourneyPlannerActions } from './journey-planner.action';

import { RootReducer } from '../reducers';

export namespace JourneyPlannerReducer {
  export const name = 'journeyPlanner';
  export const selectState = createFeatureSelector<State>(name);

  export interface State {
    homePoint: string | undefined;
    workPoint: string | undefined;
    favPoints: string[];
  }

  export const initialState: State = {
    homePoint: undefined,
    workPoint: undefined,
    favPoints: [],
  };

  export const selectors = {
    _root: createSelector(
      selectState,
      (state: State) => state
    ),
    homePoint: createSelector(
      selectState,
      (state: State) => state.homePoint,
    ),
    workPoint: createSelector(
      selectState,
      (state: State) => state.workPoint,
    ),
    favPoints: createSelector(
      selectState,
      (state: State) => state.favPoints,
    ),
  };

  export function reducer(
    state: State = initialState,
    action: JourneyPlannerActions.Actions,
  ) {
    switch (action.type) {
      case JourneyPlannerActions.SET_HOME_POINT:
        return {
          ...state,
          homePoint: action.payload || undefined,
        };
      case JourneyPlannerActions.SET_WORK_POINT:
        return {
          ...state,
          workPoint: action.payload || undefined,
        };
      case JourneyPlannerActions.LOAD_STATE:
        return {
          ...state,
          ...action.payload,
        };
      case JourneyPlannerActions.SET_FAV_POINT:
        if (state.favPoints.find((favPoint) => favPoint === action.payload)) {
          return state;
        }
        return {
          ...state,
          favPoints: [...state.favPoints, action.payload] ,
        };
      case JourneyPlannerActions.UNSET_FAV_POINT:
        return {
          ...state,
          favPoints: state.favPoints.filter((favPoint) => favPoint !== action.payload )
        };
      default:
        return state;
    }
  }
}
