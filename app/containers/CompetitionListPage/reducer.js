/*
 *
 * CompetitionList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_COMPETITION_LIST_SUCCESS, LOAD_COMPETITION_LIST_ERROR,
} from './constants';

const initialState = fromJS({
  competitionList: false,
});

function competitionListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMPETITION_LIST_SUCCESS:
      return state
        .set('competitionList', action.competitionList);
    case LOAD_COMPETITION_LIST_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default competitionListReducer;
