/*
 *
 * ContestListPage reducer
 *
 */

import { fromJS } from 'immutable';

import { CONTEST_SELECTED, CHANGE_SMALL_WIDTH } from './actions';

// The initial state of the App
const initialState = fromJS({
  selectedContest: false,
  smallWidth: window.innerWidth < 600,
});

function contestListReducer(state = initialState, action) {
  switch (action.type) {
    case CONTEST_SELECTED:
      return state.set('selectedContest', action.contest);
    case CHANGE_SMALL_WIDTH:
      return state.set('smallWidth', action.smallWidth);
    default:
      return state;
  }
}

export default contestListReducer;
