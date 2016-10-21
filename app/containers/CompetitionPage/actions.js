/*
 *
 * CompetitionPage actions
 *
 */

import {
  LOAD_COMPETITION_REQUEST, LOAD_COMPETITION_SUCCESS, LOAD_COMPETITION_ERROR,
} from './constants';

export function loadCompetition(id) {
  return {
    type: LOAD_COMPETITION_REQUEST,
    id,
  };
}

export function loadCompetitionSuccess(competition) {
  return {
    type: LOAD_COMPETITION_SUCCESS,
    competition,
  };
}


export function loadCompetitionError(error) {
  return {
    type: LOAD_COMPETITION_ERROR,
    error,
  };
}
