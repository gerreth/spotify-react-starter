/*
 *
 * Test reducer
 *
 */

import { fromJS } from 'immutable';
import { FINALIZE, INITIALIZE, SET_TOKEN } from './constants';

export const initialState = fromJS({
  error: false,
  loading: false,
  finished: false,
  token: null,
});

function spotifyCallbackReducer(state = initialState, action) {
  switch (action.type) {
    case FINALIZE:
      return state
        .set('loading', false)
        .set('finished', true);
    case INITIALIZE:
      return state
        .set('loading', true);
    case SET_TOKEN:
      return state
        .set('token', action.token);
    default:
      return state;
  }
}

export default spotifyCallbackReducer;
