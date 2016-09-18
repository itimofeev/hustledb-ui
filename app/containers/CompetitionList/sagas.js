// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
export function* defaultSaga() {
  yield 10;
}

// All sagas to be loaded
export default [
  defaultSaga,
];
