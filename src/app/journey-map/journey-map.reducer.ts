import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BikePoint } from '../models';

import { JourneyMapActions } from './journey-map.action';

export namespace JourneyMapReducer {
  export const name = 'journeyMap';
  export const selectState = createFeatureSelector<State>(name);

  export interface State {
    mapCenter: string;
    bikepointInfoWindow: BikePoint | null;
    displayBikepoints: boolean;
    bikepoints: BikePoint[];
  }

  export const initialState: State = {
    mapCenter: 'Westminster, London',
    bikepointInfoWindow: null,
    displayBikepoints: true,
    bikepoints: [],
  };

  export const selectors = {
    mapCenter: createSelector(
      selectState,
      (state: State) => state.mapCenter
    ),
    bikepointInfoWindow: createSelector(
      selectState,
      (state: State) => state.bikepointInfoWindow
    ),
    displayBikepoints: createSelector(
      selectState,
      (state: State) => state.displayBikepoints
    ),
    bikepoints: createSelector(
      selectState,
      (state: State) => state.bikepoints
    ),
  };

  export function reducer(
    state: State = initialState,
    action: JourneyMapActions.Actions
  ) {
    switch (action.type) {
      case JourneyMapActions.SET_MAP_CENTER_ACTION:
        return {
          ...state,
          mapCenter: action.payload || '',
        };

      case JourneyMapActions.SET_BIKEPOINT_INFO_WINDOW:
        return {
          ...state,
          bikepointInfoWindow: action.payload || null,
        };

      case JourneyMapActions.TOGGLE_BIKEPOINTS:
        return {
          ...state,
          displayBikepoints: Boolean(action.payload),
        };

      case JourneyMapActions.POPULATE_BIKEPOINTS:
        return {
          ...state,
          bikepoints: action.payload || [],
        };

      default:
        return state;
    }
  }
}
