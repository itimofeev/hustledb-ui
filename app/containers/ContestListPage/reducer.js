/*
 *
 * ContestListPage reducer
 *
 */

import { fromJS } from 'immutable';

import { CONTEST_SELECTED, CHANGE_SMALL_WIDTH } from './actions';
import { LOAD_CONTEST_LIST_SUCCESS } from '../App/actions';

// The initial state of the App
const initialState = fromJS({
  selectedContest: false,
  smallWidth: window.innerWidth < 600,
  visibleContestList: false,
});

function contestListReducer(state = initialState, action) {
  switch (action.type) {
    case CONTEST_SELECTED:
      return state.set('selectedContest', action.contest);
    case CHANGE_SMALL_WIDTH:
      return state.set('smallWidth', action.smallWidth);
    case LOAD_CONTEST_LIST_SUCCESS:
      return state
        .set('visibleContestList', filterContests(action.contestList));
    default:
      return state;
  }
}

function filterContests(contestList) {
  const currentYear = new Date().getFullYear();
  return contestList.filter((c) => c.date.getFullYear() === currentYear);
}

export default contestListReducer;
