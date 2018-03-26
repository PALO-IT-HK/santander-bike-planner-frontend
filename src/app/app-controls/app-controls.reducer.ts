import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppControlActions } from './app-controls.action';

import { BikePoint, MapLocation } from '../models';

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
    placeSearchResults: MapLocation[];
    bikepointSearchResults: BikePoint[];
  }

  export const initialState: State = {
    appState: AppState.NORMAL,
    fromField: '',
    toField: '',
    fromLoc: null,
    toLoc: null,
    placeSearchResults: [],
    bikepointSearchResults: [],
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
    placeSearchResults: createSelector(
      selectState,
      (state: State) => state.placeSearchResults
    ),
    bikepointSearchResults: createSelector(
      selectState,
      (state: State) => state.bikepointSearchResults
    )
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
      case AppControlActions.UPDATE_BIKEPOINT_SEARCH_RESULT:
        return {
          ...state,
          bikepointSearchResults: action.payload
        };
      case AppControlActions.UPDATE_PLACE_SEARCH_RESULT:
        return {
          ...state,
          placeSearchResults: action.payload
        };
      default:
        return state;
    }
  }
}
