/*
 * Festivals actions
 */
import { GET_FESTIVALS, SET_FESTIVALS, SET_FESTIVALS_ERROR } from './constants';

export function getFestivals() {
  return {
    type: GET_FESTIVALS
  };
}

export function setFestivals(top, remaining) {
  return {
    type: SET_FESTIVALS,
    remaining,
    top,
  };
}

export function getFestivalsError() {
  return {
    type: SET_FESTIVALS_ERROR
  };
}
