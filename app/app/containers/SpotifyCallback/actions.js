/*
 *
 * Test actions
 *
 */
import { SET_BANDS, LOGOUT } from './constants';

export function setBands(bands) {
  return {
    type: SET_BANDS,
    bands,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
