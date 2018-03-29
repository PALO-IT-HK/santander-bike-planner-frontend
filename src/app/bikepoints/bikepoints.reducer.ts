import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { BikePointIdOccupancy } from '../models';
import { BikepointsOccupancyActions } from './bikepoints.action';

export namespace BikepointsOccupancyReducer {
  export const name = 'occupacy';
  export const selectState = createFeatureSelector<State>(name);

  export interface State extends EntityState<BikePointIdOccupancy> {}

  export const adapter: EntityAdapter<BikePointIdOccupancy> = createEntityAdapter<BikePointIdOccupancy>({
    selectId: model => model.id,
    sortComparer: false
  });

  export const initalState: State = adapter.getInitialState();

  export function reducer(
    state: State = initalState,
    action: BikepointsOccupancyActions.Actions
  ) {
    switch (action.type) {
      case BikepointsOccupancyActions.UPSERT_BIKEPOINT_OCCUPANCY:
        return adapter.upsertOne(action.payload, state);

      case BikepointsOccupancyActions.CLEAR_BIKEPOINT_OCCUPANCY:
        return adapter.removeAll(state);

      default:
        return state;
    }
  }

  export const selectors = {
    allOccupancy: createSelector(
      selectState,
      adapter.getSelectors().selectEntities
    ),
    occupancyFn: (bikepointId: string) => createSelector(
      selectors.allOccupancy,
      (dictionary) => dictionary[bikepointId]
    )
  };
}
