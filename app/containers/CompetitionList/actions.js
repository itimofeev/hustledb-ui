/*
 *
 * CompetitionList actions
 *
 */

import {
  LOAD_COMPETITION_LIST, LOAD_COMPETITION_LIST_SUCCESS, LOAD_COMPETITION_LIST_ERROR,
} from './constants';

export function loadCompetitionList() {
  return {
    type: LOAD_COMPETITION_LIST,
  };
}


/**
 * Dispatched when the competition list are loaded by the request saga
 *
 * @param  {array} competitionList The competition list data
 *
 * @return {object}      An action object with a type of LOAD_DANCER_PROFILE_SUCCESS passing the dancer profile
 */
export function competitionListLoaded(competitionList) {
  return {
    type: LOAD_COMPETITION_LIST_SUCCESS,
    competitionList,
  };
}

/**
 * Dispatched when loading the competition list fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_COMPETITION_LIST_ERROR passing the error
 */
export function competitionListLoadingError(error) {
  return {
    type: LOAD_COMPETITION_LIST_ERROR,
    error,
  };
}
