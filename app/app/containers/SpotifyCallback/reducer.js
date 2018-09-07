/*
 *
 * Test reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_BANDS, LOGOUT } from './constants';

export const initialState = fromJS({
  loading: true,
  error: false,
  auth: {
    loggedIn: false
  },
  songkick: {
    festivals: []
  },
  spotify: {
    similarBands: [],
    token: '',
    topBands: []
  },
});

function spotifyCallbackReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BANDS:
      return state
        .set('error', false)
        .setIn(['spotify','topBands'], action.bands);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default spotifyCallbackReducer;
