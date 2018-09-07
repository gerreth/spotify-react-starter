/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

/**
 * Github repos request/response handler
 */
export function* load() {
  try {
    yield put(ACTION(a, b));
  } catch (err) {
    yield put(ERROR(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* initialize() {
  yield takeLatest('TEST', load)
}
