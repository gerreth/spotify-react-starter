/*
 * Bands reducer
 */

import { fromJS } from 'immutable';
import { GET_SIMILAR_BANDS, GET_TOP_BANDS } from './constants';
import { SET_SIMILAR_BANDS, SET_TOP_BANDS } from './constants';
import { SET_SIMILAR_BANDS_ERROR, SET_TOP_BANDS_ERROR } from './constants';

export const initialState = fromJS({
  error: false,
  loading: false,
  similar: [],
  top: []
});

function bandsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SIMILAR_BANDS:
      return state
        .set('loading', true);
    case SET_SIMILAR_BANDS:
      return state
        .set('loading', false)
        .set('similar', action.similar);
    case SET_SIMILAR_BANDS_ERROR:
      return state
        .set('loading', false)
        .set('error', true);
    case GET_TOP_BANDS:
      return state
        .set('loading', true);
    case SET_TOP_BANDS:
      return state
        .set('loading', false)
        .set('top', action.top);
    case SET_TOP_BANDS_ERROR:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

export default bandsReducer;
