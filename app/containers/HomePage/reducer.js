/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { COMPETITION_SELECTED, CHANGE_SMALL_WIDTH } from './actions';

// The initial state of the App
const initialState = fromJS({
  selectedCompetition: false,
  smallWidth: window.innerWidth < 600,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case COMPETITION_SELECTED:
      return state.set('selectedCompetition', action.competition);
    case CHANGE_SMALL_WIDTH:
      return state.set('smallWidth', action.smallWidth);
    default:
      return state;
  }
}

export default homeReducer;
