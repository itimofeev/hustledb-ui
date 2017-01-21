/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_CONTEST_LIST_SUCCESS,
  LOAD_CONTEST_LIST,
  LOAD_CONTEST_LIST_ERROR,
  DRAWER_OPEN_SET_STATUS,
} from './actions';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  visibleContestMap: false,
  isDrawerOpen: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONTEST_LIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('contestList', false);
    case LOAD_CONTEST_LIST_SUCCESS:
      return state
        .set('contestList', action.contestList)
        .set('loading', false)
        .set('error', false);
    case LOAD_CONTEST_LIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case DRAWER_OPEN_SET_STATUS:
      return state
        .set('isDrawerOpen', action.isDrawerOpen);
    default:
      return state;
  }
}

export default appReducer;
