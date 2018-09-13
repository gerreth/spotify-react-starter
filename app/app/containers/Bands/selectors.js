import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the test state domain
 */
const bandsSelector = state => state.get('bands', initialState)

/**
 * Other specific selectors
 */
const allBandsSelector = () =>
  createSelector(bandsSelector, substate => {
    return {
      similar: substate.get('similar'),
      top: substate.get('top')
    }
  })

export default bandsSelector
export {
  allBandsSelector
}
