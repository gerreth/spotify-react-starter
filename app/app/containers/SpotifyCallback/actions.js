/*
 *
 * Spotify callback actions
 *
 */
import { INITIALIZE, SET_TOKEN } from './constants';

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
