import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the test state domain
 */
const bandsSelector = state => state.get('bands', initialState)

/**
 * Other specific selectors
 */
const topBandNames = () =>
 createSelector(bandsSelector, substate => {
   const top = substate.get('top')
   const names = top.map(band => band.name)

   return names
 })

const similarBandNames = () =>
  createSelector(bandsSelector, substate => {
    const similar = substate.get('similar')
    const names = similar.map(band => band.name)

    return names
  })

const allBandsSelector = () =>
  createSelector(bandsSelector, substate => {
    return {
      similar: substate.get('similar'),
      top: substate.get('top')
    }
  })

export default bandsSelector
export {
  allBandsSelector,
  similarBandNames,
  topBandNames,
}
