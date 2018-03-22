import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BikePoint } from '../models';

import { JourneyMapActions } from './journey-map.action';

export namespace JourneyMapReducer {
  export const name = 'journeyMap';
  export const selectJourneyMapState = createFeatureSelector<State>(name);

  export interface State {
    mapCenter: string;
    bikepointInfoWindow: BikePoint | null;
    bikepoints: BikePoint[];
  }

  export const initialState: State = {
    mapCenter: 'Westminster, London',
    bikepointInfoWindow: null,
    bikepoints: [],
  };

  export const selectors = {
    mapCenter: createSelector(
      selectJourneyMapState,
      (state: State) => state.mapCenter
    ),
    bikepointInfoWindow: createSelector(
      selectJourneyMapState,
      (state: State) => state.bikepointInfoWindow
    ),
    bikepoints: createSelector(
      selectJourneyMapState,
      (state: State) => state.bikepoints
    ),
  };

  export function reducer(
    state: State = initialState,
    action: JourneyMapActions.Actions
  ) {
    switch (action.type) {
      case JourneyMapActions.SET_BIKEPOINT_INFO_WINDOW:
        return {
          ...state,
          bikepointInfoWindow: action.payload || null,
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
