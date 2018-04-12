import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GoogleUserInfo } from './models/google-user';
import { AuthActions } from './auth.action';

export namespace AuthReducer {
  export const name = 'auth';
  export const selectState = createFeatureSelector<State>(name);

  export interface State {
    user: GoogleUserInfo | undefined;
  }

  export const initialState: State = {
    user: undefined,
  };

  export const selectors = {
    user: createSelector(
      selectState,
      (state: State) => state.user
    ),
  };

  export function reducer(
    state: State = initialState,
    action: AuthActions.Actions
  ) {
    switch (action.type) {
      case AuthActions.SET_USER:
        return {
          ...state,
          user: action.payload,
        };

      case AuthActions.RESET_USER:
        return {
          ...state,
          user: undefined,
        };

      default:
        return state;
    }
  }
}
