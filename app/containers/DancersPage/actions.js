/*
 *
 * DancersPage actions
 *
 */

import {
  CHANGE_SEARCH_INPUT, LOAD_DANCERS, LOAD_DANCERS_ERROR, LOAD_DANCERS_SUCCESS,
} from './constants';

/**
 * Changes the input of dancer search field
 *
 * @param  {input} searchInput The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_SEARCH_INPUT
 */
export function changeDancerInput(searchInput) {
  return {
    type: CHANGE_SEARCH_INPUT,
    searchInput,
  };
}

/**
 * Load the dancers, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DANCERS
 */
export function loadDancers() {
  return {
    type: LOAD_DANCERS,
  };
}

/**
 * Dispatched when the dancers are loaded by the request saga
 *
 * @param  {array} dancers The dancer data
 * @param  {string} searchInput The current search input
 *
 * @return {object}      An action object with a type of LOAD_DANCERS_SUCCESS passing the repos
 */
export function dancersLoaded(dancers, searchInput) {
  return {
    type: LOAD_DANCERS_SUCCESS,
    dancers,
    searchInput,
  };
}

/**
 * Dispatched when loading the dancers fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_DANCERS_ERROR passing the error
 */
export function dancersLoadingError(error) {
  return {
    type: LOAD_DANCERS_ERROR,
    error,
  };
}
