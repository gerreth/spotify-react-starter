/*
 * Festivals actions
 */
import { GET_FESTIVALS, SET_FESTIVALS, SET_FESTIVALS_ERROR } from './constants';

export function getFestivals() {
  return {
    type: GET_FESTIVALS
  };
}

export function setFestivals(festivals) {
  return {
    type: SET_FESTIVALS,
    festivals,
  };
}

export function getFestivalsError() {
  return {
    type: SET_FESTIVALS_ERROR
  };
}
