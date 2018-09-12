/**
 *
 */
import { call, fork, put, select, takeLatest } from 'redux-saga/effects'
import { FINALIZE, INITIALIZE } from './constants'
import 'whatwg-fetch';
import querystring from 'querystring'

import { getSimilarBands, getTopBands } from '../Bands/actions'
import { setSimilarBands, setTopBands } from '../Bands/actions'
import { setSimilarBandsError, setTopBandsError } from '../Bands/actions'
import { getFestivals } from '../Festivals/actions'
import { setFestivals } from '../Festivals/actions'
import { setFestivalsError } from '../Festivals/actions'
import { finalize } from './actions'

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

    topBands = yield call(topBandsRequest, token)
    topBandNames = topBands.map(band => band.name)

    yield put(setTopBands(topBands))
  } catch (error) {
    yield put(setTopBandsError())
    throw(error)
  }

  try {
    yield put(getSimilarBands())

    const ids = topBands.map(band => band.id)

    similarBands = yield call(similarBandRequest, token, ids)

    similarBands = similarBands.filter(band => topBandNames.indexOf(band.name) === -1) // maybe better do this on the backend
    similarBandNames = similarBands.map(band => band.name)

    yield put(setSimilarBands(similarBands))
  } catch (error) {
    yield put(setSimilarBandsError())
    throw(error)
  }

  try {
    yield put(getFestivals())

    festivals = yield call(festivalsRequest, topBandNames, similarBandNames)

    const topFestivals = festivals.slice(0,10)
    const remainingFestivals = festivals.slice(10)

    yield put(setFestivals(topFestivals, remainingFestivals))
  } catch (error) {
    yield put(setFestivalsError())
    throw(error)
  }

  yield put(finalize())
}

const topBandsRequest = async (token) => {
  const url = `http://localhost:9001/spotify/top-bands?${querystring.stringify({ token })}`

  const options = {
    json: true,
    method: 'GET',
  }

  const response = await fetch(url, options)

  return response.json()
}

const similarBandRequest = async (token, ids) => {
  const url = `http://localhost:9001/spotify/similar-bands?${querystring.stringify({ token })}`

  const options = {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ ids })
  }

  const response = await fetch(url, options)

  return response.json()
}

const festivalsRequest = async (topBands, similarBands) => {
  const url = 'http://localhost:9001/songkick/festivals'

  const post = {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      topBands,
      similarBands
    })
  }

  const response = await fetch(url, post)

  return response.json()
}
