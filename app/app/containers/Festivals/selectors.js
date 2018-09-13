import { createSelector } from 'reselect'
import { initialState } from './reducer'

import { sortByDate } from '../../helper'
/**
 * Direct selector to the test state domain
 */
const festivalsSelector = state => state.get('festivals', initialState)

/**
 * Other specific selectors
 */
// const allFestivalsSelector = () =>
//   createSelector(festivalsSelector, substate => {
//     return {
//       remaining: substate.get('remaining'),
//       top: substate.get('top')
//     }
//   })

const highlightFestivalsSelector = () =>
  createSelector(festivalsSelector, substate =>
    substate.get('highlight').sort(sortByDate)
  )

const allFestivalsSelector = () =>
  createSelector(festivalsSelector, substate => {
    const all = [...substate.get('similar'), ...substate.get('highlight')]

    return all.sort(sortByDate)
  })

export default festivalsSelector
export {
  allFestivalsSelector,
  highlightFestivalsSelector
}
