/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectContestList = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('contestList')
);

const selectIsDrawerOpen = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('isDrawerOpen')
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectContestList,
  selectLoading,
  selectError,
  selectLocationState,
  selectIsDrawerOpen,
};
