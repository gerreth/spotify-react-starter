import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the test state domain
 */
const spotifySelector = state => state.get('spotify', initialState)

/**
 * Other specific selectors
 */

/**
 * Default selector used by Spotify
 */
const spotifyTokenSelector = () =>
  createSelector(spotifySelector, substate => substate.get('token'))

const spotifyLoadingSelector = () =>
  createSelector(spotifySelector, substate => substate.get('loading'))

const spotifyFinishedSelector = () =>
  createSelector(spotifySelector, substate => substate.get('finished'))

export default spotifySelector
export {
  spotifyFinishedSelector,
  spotifyLoadingSelector,
  spotifyTokenSelector
}
