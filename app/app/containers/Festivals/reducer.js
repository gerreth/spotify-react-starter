/*
 * Bands reducer
 */

import { fromJS } from 'immutable';
import { GET_FESTIVALS, SET_FESTIVALS, SET_FESTIVALS_ERROR } from './constants';

export const initialState = fromJS({
  error: false,
  loading: false,
  highlight: [],
  similar: [],
});

function festivalsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FESTIVALS:
      return state
        .set('loading', true);
    case SET_FESTIVALS:
      return state
        .set('loading', false)
        .set('highlight', action.festivals.filter(festival => festival.highlight))
        .set('similar', action.festivals.filter(festival => !festival.highlight));
    case SET_FESTIVALS_ERROR:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

export default festivalsReducer;
