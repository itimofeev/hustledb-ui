import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_COMPETITION_LIST } from './constants';
import request from 'utils/request';

import { competitionListLoaded, competitionListLoadingError } from './actions';


/**
 * Competition list request/response handler
 */
export function* getCompetitionList() {
  const requestURL = '/api/v1/competitions';

  // Call our request helper (see 'utils/request')
  const competitionList = yield call(request, requestURL);

  if (!competitionList.err) {
    yield put(competitionListLoaded(competitionList.data));
  } else {
    yield put(competitionListLoadingError(competitionList.err));
  }
}

/**
 * Watches for LOAD_COMPETITION_LIST action and calls handler
 */
export function* getCompetitionListWatcher() {
  yield* takeEvery(LOAD_COMPETITION_LIST, getCompetitionList);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* competitionListData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getCompetitionListWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  competitionListData,
];
