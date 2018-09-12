/*
 *
 * Spotify callback actions
 *
 */
import { FINALIZE, INITIALIZE, SET_TOKEN } from './constants';

export function finalize() {
  return {
    type: FINALIZE,
  };
}

export function initialize() {
  return {
    type: INITIALIZE,
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token
  };
}
