import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_DANCER_PROFILE } from './constants';
import request from 'utils/request';

import { dancerProfileLoaded, dancerProfileLoadingError } from './actions';


/**
 * Dancers request/response handler
 */
export function* getDancerProfile(action) {
  const requestURL = `/api/v1/dancers/${action.dancerId}`;

  // Call our request helper (see 'utils/request')
  const dancerProfile = yield call(request, requestURL);

  if (!dancerProfile.err) {
    yield put(dancerProfileLoaded(dancerProfile.data, action.dancerId));
  } else {
    yield put(dancerProfileLoadingError(dancerProfile.err));
  }
}

/**
 * Watches for LOAD_DANCERS action and calls handler
 */
export function* getDancerProfileWatcher() {
  yield* takeEvery(LOAD_DANCER_PROFILE, getDancerProfile);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* dancerProfileData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getDancerProfileWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  dancerProfileData,
];
