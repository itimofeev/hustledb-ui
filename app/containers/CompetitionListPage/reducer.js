/*
 *
 * CompetitionListPage reducer
 *
 */

import { fromJS } from 'immutable';

import { COMPETITION_SELECTED, CHANGE_SMALL_WIDTH } from './actions';

// The initial state of the App
const initialState = fromJS({
  selectedCompetition: false,
  smallWidth: window.innerWidth < 600,
});

function competitionListReducer(state = initialState, action) {
  switch (action.type) {
    case COMPETITION_SELECTED:
      return state.set('selectedCompetition', action.competition);
    case CHANGE_SMALL_WIDTH:
      return state.set('smallWidth', action.smallWidth);
    default:
      return state;
  }
}

export default competitionListReducer;
