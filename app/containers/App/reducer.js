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
  LOAD_FCOMP_LIST_SUCCESS,
  LOAD_FCOMP_LIST,
  LOAD_FCOMP_LIST_ERROR,
} from './actions';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  fCompList: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FCOMP_LIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('fCompList', false);
    case LOAD_FCOMP_LIST_SUCCESS:
      return state
        .set('fCompList', action.fCompList)
        .set('loading', false)
        .set('error', false);
    case LOAD_FCOMP_LIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
