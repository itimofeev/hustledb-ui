/*
 *
 * CompetitionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_COMPETITION_REQUEST, LOAD_COMPETITION_SUCCESS, LOAD_COMPETITION_ERROR
} from './constants';

const initialState = fromJS({
  competition: false,
  loading: false,
  error: false,
});

function competitionPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMPETITION_REQUEST:
      return state
        .set('loading', true);
    case LOAD_COMPETITION_SUCCESS:
      return state
        .set('competition', action.competition)
        .set('loading', false);
    case LOAD_COMPETITION_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default competitionPageReducer;
