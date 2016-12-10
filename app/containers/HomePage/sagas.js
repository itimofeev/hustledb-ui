/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_FCOMP_LIST } from '../../containers/App/actions';
import { fCompListLoaded, fCompListLoadingError } from '../../containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getFCompList() {
  // const username = yield select(selectUsername());
  const requestURL = `/api/v1/forum/competitions`;

  const fCompList = yield call(request, requestURL);

  if (!fCompList.err) {
    fCompList.data.forEach((fComp) => fComp.date = new Date(fComp.date));
    yield put(fCompListLoaded(fCompList.data));
  } else {
    yield put(fCompListLoadingError(fCompList.err));
  }
}

export function* getFCompListWatcher() {
  while (yield take(LOAD_FCOMP_LIST)) {
    yield call(getFCompList);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* fCompListData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getFCompListWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  fCompListData,
];
