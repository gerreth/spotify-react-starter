import { createSelector } from 'reselect'
import { initialState } from './reducer'

import { sortByDate } from '../../helper'

const calculateCount = (festival) => festival.artists.reduce((count, band) => count + band.similar + 2*band.highlight, 0)
/**
 * Direct selector to the test state domain
 */
const festivalsSelector = state => state.get('festivals', initialState)

/**
 * Other specific selectors
 */
const topFestivalsSelector = () =>
  createSelector(festivalsSelector, substate => {
     if (!Boolean(substate.get('highlight') instanceof Array)) return []
     if (!Boolean(substate.get('similar') instanceof Array)) return []

     const all = [...substate.get('highlight'), ...substate.get('similar')]

     return all
       .sort((a, b) => calculateCount(b) - calculateCount(a))
       .slice(0, 5)
       .sort(sortByDate)
   }
  )

const highlightFestivalsSelector = () =>
  createSelector(festivalsSelector, substate => {
      if (!Boolean(substate.get('highlight') instanceof Array)) return []

      const highlight = substate.get('highlight')

      return highlight.sort(sortByDate)
    }
  )

const allFestivalsSelector = () =>
  createSelector(festivalsSelector, substate => {
    const all = [...substate.get('similar'), ...substate.get('highlight')]

    return all.sort(sortByDate)
  })

export default festivalsSelector
export {
  allFestivalsSelector,
  highlightFestivalsSelector,
  topFestivalsSelector
}
