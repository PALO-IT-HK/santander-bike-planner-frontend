import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BikePoint, Journey, MapBoundary } from '../models';

import { JourneyMapActions } from './journey-map.action';
import { RootReducer } from '../reducers';

export namespace JourneyMapReducer {
  export const name = 'journeyMap';
  export const selectState = createFeatureSelector<State>(name);

  export interface State {
    mapCenter: string;
    mapBoundary?: MapBoundary;
    bikepointInfoWindow: BikePoint | null;
    bikepoints: BikePoint[];
    autofetchBikepoints: boolean;
    fromLoc: BikePoint | null;
    toLoc: BikePoint | null;
    journey: Journey | null;
  }

  export const initialState: State = {
    mapCenter: 'Westminster, London',
    bikepointInfoWindow: null,
    bikepoints: [],
    autofetchBikepoints: true,
    fromLoc: null,
    toLoc: null,
    journey: null,
  };

  export const selectors = {
    mapCenter: createSelector(
      selectState,
      (state: State) => state.mapCenter,
    ),
    mapBoundary: createSelector(
      selectState,
      (state: State) => state.mapBoundary,
    ),
    bikepointInfoWindow: createSelector(
      selectState,
      (state: State) => state.bikepointInfoWindow,
    ),
    bikepoints: createSelector(
      selectState,
      (state: State) => state.bikepoints,
    ),
    autofetchBikepoints: createSelector(
      selectState,
      (state: State) => state.autofetchBikepoints,
    ),
    fromLoc: createSelector(
      selectState,
      (state: State) => state.fromLoc,
    ),
    toLoc: createSelector(
      selectState,
      (state: State) => state.toLoc,
    ),
    journey: createSelector(
      selectState,
      (state: State) => state.journey,
    ),
  };

  export function reducer(
    state: State = initialState,
    action: JourneyMapActions.Actions
  ) {
    switch (action.type) {
      case JourneyMapActions.RESET_MAP_STATE_ACTION:
        return {
          ...state,
          bikepointInfoWindow: null,
          autofetchBikepoints: true,
          fromLoc: null,
          toLoc: null,
          journey: null,
        };

      case JourneyMapActions.SET_MAP_CENTER_ACTION:
        return {
          ...state,
          mapCenter: action.payload || '',
        };

      case JourneyMapActions.UPDATE_MAP_BOUNDARY:
        return {
          ...state,
          mapBoundary: action.payload,
        };

      case JourneyMapActions.SET_BIKEPOINT_INFO_WINDOW:
        return {
          ...state,
          bikepointInfoWindow: action.payload || null,
        };

      case JourneyMapActions.TOGGLE_AUTO_FETCH_BIKEPOINT:
        return {
          ...state,
          autofetchBikepoints: action.payload || false,
        };

      case JourneyMapActions.POPULATE_BIKEPOINTS:
        return {
          ...state,
          bikepoints: action.payload || [],
        };

      case JourneyMapActions.SELECT_FROM_BIKEPOINT:
        return {
          ...state,
          fromLoc: action.payload || null,
        };

      case JourneyMapActions.SELECT_TO_BIKEPOINT:
        return {
          ...state,
          toLoc: action.payload || null,
        };

      case JourneyMapActions.UPDATE_JOURNEY:
        return {
          ...state,
          journey: action.payload || null
        };

      default:
        return state;
    }
  }
}
