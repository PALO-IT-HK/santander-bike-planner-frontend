import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppControlActions } from './app-controls.action';

import { AppState, BikePoint, MapLocation, Journey } from '../models';
import { RootReducer } from '../reducers';

export namespace AppControlReducer {
  export const name = 'appCtrl';
  export const selectState = createFeatureSelector<State>(name);

  export interface State {
    appState: AppState;
    fromField: string;
    toField: string;
    placeSearchResults: MapLocation[];
    bikepointSearchResults: BikePoint[];
  }

  export const initialState: State = {
    appState: AppState.NORMAL,
    fromField: '',
    toField: '',
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
    haveSearchResults: createSelector(
      selectState,
      (state: State) => state.placeSearchResults.length > 0 || state.bikepointSearchResults.length > 0
    ),
    placeSearchResults: createSelector(
      selectState,
      (state: State) => state.placeSearchResults
    ),
    bikepointSearchResults: createSelector(
      selectState,
      (state: State) => state.bikepointSearchResults
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
      case AppControlActions.RESET_APP_STATE:
        return {
          ...state,
          appState: AppState.NORMAL,
          fromLoc: null,
          toLoc: null,
          fromField: '',
          toField: '',
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
