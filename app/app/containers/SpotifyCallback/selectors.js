import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the test state domain
 */
const selectSpotifyCallbackDomain = state => state.get('', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SpotifyCallback
 */
const makeSelectSpotifyCallback = () =>
  createSelector(selectSpotifyCallbackDomain, substate => substate.toJS());

export default makeSelectSpotifyCallback;
