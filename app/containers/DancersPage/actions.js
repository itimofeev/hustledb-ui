/*
 *
 * DancersPage actions
 *
 */

import {
  CHANGE_SEARCH_INPUT, LOAD_DANCERS, LOAD_DANCERS_ERROR, LOAD_DANCERS_SUCCESS
} from './constants';

/**
 * Changes the input of dancer search field
 *
 * @param  {input} input The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_SEARCH_INPUT
 */
export function changeDancerInput(searchInput) {
  return {
    type: CHANGE_SEARCH_INPUT,
    searchInput,
  };
}
