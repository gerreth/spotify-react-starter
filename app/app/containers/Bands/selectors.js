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
   if (!Boolean(substate.get('top') instanceof Array)) return []

   const top = substate.get('top')
   const names = top.map(band => band.name)

   return names
 })

const similarBandNames = () =>
  createSelector(bandsSelector, substate => {
    if (!Boolean(substate.get('similar') instanceof Array)) return []

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

const topBandsIdSelector = () =>
  createSelector(bandsSelector, substate => {
    const top = substate.get('top')

    return top.map(band => band.id)
  })



export default bandsSelector
export {
  allBandsSelector,
  similarBandNames,
  topBandNames,
  topBandsIdSelector,
}
