/*
 *
 * DancersPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SEARCH_INPUT, LOAD_DANCERS_SUCCESS, LOAD_DANCERS_ERROR,
} from './constants';

const initialState = fromJS({
  searchInput: '',
  dancers: false,
});

function dancersPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return state
        .set('searchInput', action.searchInput);
    case LOAD_DANCERS_SUCCESS:
      return state
        .set('dancers', action.dancers)
        .set('searchInput', action.searchInput);
    case LOAD_DANCERS_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default dancersPageReducer;
