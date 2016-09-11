import { take, call, put, select, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_DANCERS } from './constants';
import request from 'utils/request';

import { selectSearchInput } from './selectors';
import { dancersLoaded, dancersLoadingError } from './actions';


/**
 * Dancers request/response handler
 */
export function* getDancers() {
  // Select username from store
  const searchInput = yield select(selectSearchInput());
  const requestURL = `/api/v1/dancers?query=${searchInput}`;

  // Call our request helper (see 'utils/request')
  const dancers = yield call(request, requestURL);

  if (!dancers.err) {
    yield put(dancersLoaded(dancers.data, searchInput));
  } else {
    yield put(dancersLoadingError(dancers.err));
  }
}

/**
 * Watches for LOAD_DANCERS action and calls handler
 */
export function* getDancersWatcher() {
  while (yield take(LOAD_DANCERS)) {
    yield call(getDancers);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* dancersData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getDancersWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  dancersData,
];
