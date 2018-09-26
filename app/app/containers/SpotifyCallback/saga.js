/**
 *
 */
import { call, fork, put, select, takeLatest } from 'redux-saga/effects'
import { FINALIZE, INITIALIZE } from './constants'
import 'whatwg-fetch'
import querystring from 'querystring'

import {
  getSimilarBands,
  getTopBands,
  setSimilarBands,
  setTopBands,
  setSimilarBandsError,
  setTopBandsError
} from '../Bands/actions'

import {
  getFestivals,
  setFestivals,
  setFestivalsError
} from '../Festivals/actions'

import { finalize } from './actions'

import { spotifyTokenSelector } from './selectors'
import { similarBandNames, topBandNames, topBandsIdSelector } from '../Bands/selectors'

/**
 * Root saga manages watcher lifecycle
 */
export default function* initialize() {
  yield takeLatest(INITIALIZE, load)
}

function* load() {
  const token = yield select(spotifyTokenSelector())

  try {
    yield put(getTopBands())
    const topBands = yield call(topBandsRequest, token)
    yield put(setTopBands(topBands))
  } catch (error) {
    yield put(setTopBandsError())
    throw(error)
  }

  const ids = yield select(topBandsIdSelector())

  try {
    yield put(getSimilarBands())
    const similarBands = yield call(similarBandRequest, token, ids)
    yield put(setSimilarBands(similarBands))
  } catch (error) {
    yield put(setSimilarBandsError())
    throw(error)
  }

  const similarNames = yield select(similarBandNames())
  const topNames = yield select(topBandNames())

  try {
    yield put(getFestivals())
    const festivals = yield call(festivalsRequest, topNames, similarNames)
    yield put(setFestivals(festivals))
  } catch (error) {
    yield put(setFestivalsError())
    throw(error)
  }

  yield put(finalize())
}

/**
 *  Requests
 */
const topBandsRequest = async(token) => {
  const url = `http://localhost:9001/spotify/top-bands?${querystring.stringify({ token })}`

  const options = {
    json: true,
    method: 'GET',
  }

  const response = await fetch(url, options)

  return response.json()
}

const similarBandRequest = async(token, ids) => {
  const url = `http://localhost:9001/spotify/similar-bands?${querystring.stringify({ token })}`

  const options = {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ ids })
  }

  const response = await fetch(url, options)

  return response.json()
}

const festivalsRequest = async(topBands, similarBands) => {
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
