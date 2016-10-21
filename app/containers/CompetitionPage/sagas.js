import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_COMPETITION_REQUEST } from './constants';
import request from 'utils/request';

import { loadCompetitionSuccess, loadCompetitionError } from './actions';


/**
 * Dancers request/response handler
 */
export function* getCompetition(action) {
  const requestURL = `/api/v1/competitions/${action.id}`;

  const competitionData = yield call(request, requestURL);

  if (!competitionData.err) {
    yield put(loadCompetitionSuccess(competitionData.data));
  } else {
    yield put(loadCompetitionError(competitionData.err));
  }
}

/**
 * Watches for LOAD_COMPETITION_REQUEST action and calls handler
 */
export function* getCompetitionWatcher() {
  yield* takeEvery(LOAD_COMPETITION_REQUEST, getCompetition);
}


export function* competitionData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getCompetitionWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  competitionData,
];
