/*
 *
 * DancersPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
  CHANGE_SEARCH_INPUT,
} from './constants';

const initialState = fromJS({
  searchInput: '',
});

function dancersPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return state
        .set('searchInput', action.searchInput);
    default:
      return state;
  }
}

export default dancersPageReducer;
