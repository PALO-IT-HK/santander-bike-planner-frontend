import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BikePoint, Journey, MapBoundary } from '../models';

import { JourneyMapActions } from './journey-map.action';
import { RootReducer } from '../reducers';

export namespace JourneyMapReducer {
  export const name = 'journeyMap';
  export const selectState = createFeatureSelector<State>(name);

  export interface State {
    mapCenter: string;
    mapZoom: number;
    mapBoundary?: MapBoundary;
    mapLoading: boolean;
    bikepointInfoWindow: BikePoint | null;
    bikepoints: BikePoint[];
    autofetchBikepoints: boolean;
    fromLoc: BikePoint[];
    toLoc: BikePoint[];
    journey: Journey | null;
  }

  export const initialState: State = {
    mapCenter: 'Westminster, London',
    mapZoom: 16,
    mapLoading: false,
    bikepointInfoWindow: null,
    bikepoints: [],
    autofetchBikepoints: true,
    fromLoc: [],
    toLoc: [],
    journey: null,
  };

  export const selectors = {
    mapCenter: createSelector(
      selectState,
      (state: State) => state.mapCenter,
    ),
    mapZoom: createSelector(
      selectState,
      (state: State) => state.mapZoom,
    ),
    mapBoundary: createSelector(
      selectState,
      (state: State) => state.mapBoundary,
    ),
    mapLoading: createSelector(
      selectState,
      (state: State) => state.mapLoading,
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
          bikepoints: [],
          autofetchBikepoints: true,
          fromLoc: [],
          toLoc: [],
          journey: null,
        };

      case JourneyMapActions.SET_MAP_CENTER_ACTION:
        return {
          ...state,
          mapCenter: action.payload || '',
        };

      case JourneyMapActions.SET_MAP_ZOOM_ACTION:
        return {
          ...state,
          mapZoom: action.payload || 16,
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
          fromLoc: action.payload ? [action.payload] : [],
        };

      case JourneyMapActions.SELECT_TO_BIKEPOINT:
        return {
          ...state,
          toLoc: action.payload ? [action.payload] : [],
        };

      case JourneyMapActions.UPDATE_JOURNEY:
        return {
          ...state,
          journey: action.payload || null
        };

      case JourneyMapActions.SET_MAP_LOADING:
        return {
          ...state,
          mapLoading: action.payload,
        };

      default:
        return state;
    }
  }
}
