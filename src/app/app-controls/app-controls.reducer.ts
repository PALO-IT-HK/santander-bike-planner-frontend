import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppControlActions } from './app-controls.action';

import { BikePoint } from '../models';

import { AppState } from './models';

export namespace AppControlReducer {
  export const name = 'appCtrl';
  export const selectState = createFeatureSelector<State>(name);

  export interface State {
    appState: AppState;
    fromField: string;
    toField: string;
    fromLoc: BikePoint | null;
    toLoc: BikePoint | null;
  }

  export const initialState: State = {
    appState: AppState.NORMAL,
    fromField: '',
    toField: '',
    fromLoc: null,
    toLoc: null,
  };

  export const selectors = {
    appState: createSelector(
      selectState,
      (state: State) => state.appState
    ),
    fromField: createSelector(
      selectState,
      (state: State) => state.fromField
    ),
    toField: createSelector(
      selectState,
      (state: State) => state.toField
    ),
    fromLoc: createSelector(
      selectState,
      (state: State) => state.fromLoc
    ),
    toLoc: createSelector(
      selectState,
      (state: State) => state.toLoc
    ),
  };

  export function reducer(
    state: State = initialState,
    action: AppControlActions.Actions
  ) {
    switch (action.type) {
      case AppControlActions.SET_APP_STATE:
        return {
          ...state,
          appState: action.payload,
        };
      case AppControlActions.SET_FROM_FIELD:
        return {
          ...state,
          fromField: action.payload,
        };
      case AppControlActions.SET_TO_FIELD:
        return {
          ...state,
          toField: action.payload,
        };
      case AppControlActions.SELECT_FROM_BIKEPOINT:
        return {
          ...state,
          fromLoc: action.payload,
        };
      case AppControlActions.SELECT_TO_BIKEPOINT:
        return {
          ...state,
          toLoc: action.payload,
        };
      default:
        return state;
    }
  }
}
