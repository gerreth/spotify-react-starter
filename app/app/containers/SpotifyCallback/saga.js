/**
 *
 */
import { call, fork, put, select, takeLatest } from 'redux-saga/effects'
import { INITIALIZE } from './constants'
import 'whatwg-fetch';
import querystring from 'querystring'

import { getSimilarBands, getTopBands } from '../Bands/actions'
import { setSimilarBands, setTopBands } from '../Bands/actions'
import { setSimilarBandsError, setTopBandsError } from '../Bands/actions'
import { getFestivals } from '../Festivals/actions'
import { setFestivals } from '../Festivals/actions'
import { setFestivalsError } from '../Festivals/actions'

const selectToken = state => state.toJS().spotify.token;

/**
 * Root saga manages watcher lifecycle
 */
export default function* initialize() {
  yield takeLatest(INITIALIZE, load)
}

function* load() {
  let festivals
  let topBands
  let topBandNames
  let similarBands
  let similarBandNames

  const token = yield select(selectToken);

  try {
    yield put(getTopBands())
    const url = `http://localhost:9001/spotify/top-bands?${querystring.stringify({ token })}`
    const options = {
      json: true,
      method: 'GET',
    }

    topBands = yield fetch(url, options).then(response => response.json())
    topBandNames = topBands.map(band => band.name)
    yield put(setTopBands(topBands))
  } catch (error) {
    yield put(setTopBandsError())
    throw(error)
  }

  try {
    yield put(getSimilarBands())

    const ids = topBands.map(band => band.id)
    const options = {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ids })
    }

    const url = `http://localhost:9001/spotify/similar-bands?${querystring.stringify({ token })}`
    similarBands = yield fetch(url, options).then(response => response.json())

    similarBands = similarBands.filter(band => topBandNames.indexOf(band.name) === -1)
    similarBandNames = similarBands.map(band => band.name)

    yield put(setSimilarBands(similarBands))
  } catch (error) {
    yield put(setSimilarBandsError())
    throw(error)
  }

  try {
    yield put(getFestivals())

    console.log('!!! duplicates !!!')
    console.log(topBandNames.sort())
    console.log(similarBandNames.sort())

    const post = {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        topBands: topBandNames,
        similarBands: similarBandNames
      })
    }

    const url = 'http://localhost:9001/songkick/festivals'

    festivals = yield fetch(url, post).then(response => response.json())

    const topFestivals = festivals.slice(0,10)
    const remainingFestivals = festivals.slice(10)

    yield put(setFestivals(topFestivals, remainingFestivals))
  } catch (error) {
    yield put(setFestivalsError())
    throw(error)
  }
}

// function* load() {
//   yield call(first)
//   yield call(second)
//   yield call(third)
// }
//
// function* first() {
//   const token = yield select(selectToken);
//   yield put(getTopBands())
//   try {
//     const top = yield call(() => { return [{ name: 'A' }]})
//     yield put(setTopBands(top))
//   } catch (error) {
//     yield put(setTopBandsError())
//   }
// }
//
// function* second() {
//   const top = [{ name: 'A' }]
//   yield put(getSimilarBands())
//   try {
//     const similar = yield call(top => { return [{ name: 'B' }, ...top]}, top)
//     yield put(setSimilarBands(similar))
//   } catch (error) {
//     console.log(error)
//     yield put(setSimilarBandsError())
//   }
// }
//
// function* third() {
//   const similar = [{ name: 'B' }]
//   const top = [{ name: 'A' }]
//   yield put(getFestivals())
//   try {
//     const festivals = yield call((similar, top) => { return ['a','b','c','d','e',similar[0].name,top[0].name] }, similar, top)
//     yield put(setFestivals(festivals.slice(0,2), festivals.slice(2)))
//   } catch (error) {
//     yield put(setFestivalsError())
//   }
// }
