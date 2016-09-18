/*
 *
 * DancerProfile actions
 *
 */

import {
  LOAD_DANCER_PROFILE, LOAD_DANCER_PROFILE_ERROR, LOAD_DANCER_PROFILE_SUCCESS,
} from './constants';


/**
 * Load dancer profile, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DANCER_PROFILE
 */
export function loadDancerProfile(dancerId) {
  return {
    type: LOAD_DANCER_PROFILE,
    dancerId,
  };
}

/**
 * Dispatched when the dancer profile are loaded by the request saga
 *
 * @param  {array} dancerProfile The dancer data
 * @param  {string} dancerId The current dancerId
 *
 * @return {object}      An action object with a type of LOAD_DANCER_PROFILE_SUCCESS passing the dancer profile
 */
export function dancerProfileLoaded(dancerProfile, dancerId) {
  return {
    type: LOAD_DANCER_PROFILE_SUCCESS,
    dancerProfile,
    dancerId,
  };
}

/**
 * Dispatched when loading the dancer profile fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_DANCER_PROFILE_ERROR passing the error
 */
export function dancerProfileLoadingError(error) {
  return {
    type: LOAD_DANCER_PROFILE_ERROR,
    error,
  };
}
