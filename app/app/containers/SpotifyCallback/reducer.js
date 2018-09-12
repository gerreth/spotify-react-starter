/*
 *
 * Test reducer
 *
 */

import { fromJS } from 'immutable';
import { INITIALIZE, SET_TOKEN } from './constants';

export const initialState = fromJS({
  error: false,
  loading: true,
  token: null,
});

function spotifyCallbackReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return state;
    case SET_TOKEN:
      return state
        .set('token', action.token);
    default:
      return state;
  }
}

export default spotifyCallbackReducer;
