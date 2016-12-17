import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { fContestListLoaded, fContestListLoadingError, LOAD_CONTEST_LIST } from '../../containers/App/actions';

import request from 'utils/request';

export function* getContestList() {
  // const username = yield select(selectUsername());
  const requestURL = '/api/v1/forum/competitions';

  const contestList = yield call(request, requestURL);

  if (!contestList.err) {
    contestList.data.forEach((fComp) => {
      fComp.date = new Date(fComp.date);// eslint-disable-line
    });
    yield put(fContestListLoaded(contestList.data));
  } else {
    yield put(fContestListLoadingError(contestList.err));
  }
}

export function* getContestListWatcher() {
  while (yield take(LOAD_CONTEST_LIST)) {
    yield call(getContestList);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* contestListData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getContestListWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  contestListData,
];
