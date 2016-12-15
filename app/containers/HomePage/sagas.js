import { take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';


export function* data() {
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

// Bootstrap sagas
export default [
  data,
];
