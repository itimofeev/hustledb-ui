/*
 *
 * DancerProfile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_DANCER_PROFILE_SUCCESS, LOAD_DANCER_PROFILE_ERROR,
} from './constants';

const initialState = fromJS({
  dancerProfile: false,
  dancerId: false,
});

function dancerProfileReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DANCER_PROFILE_SUCCESS:
      return state
        .set('dancerProfile', action.dancerProfile)
        .set('dancerId', action.dancerId);
    case LOAD_DANCER_PROFILE_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default dancerProfileReducer;
