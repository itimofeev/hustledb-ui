/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */


export const LOAD_CONTEST_LIST = 'vhustle/App/LOAD_CONTEST_LIST';
export const LOAD_CONTEST_LIST_SUCCESS = 'vhustle/App/LOAD_CONTEST_LIST_SUCCESS';
export const LOAD_CONTEST_LIST_ERROR = 'vhustle/App/LOAD_CONTEST_LIST_ERROR';
export const DRAWER_OPEN_SET_STATUS = 'vhustle/App/DRAWER_OPEN_SET_STATUS';

export function loadContestList() {
  return {
    type: LOAD_CONTEST_LIST,
  };
}

export function fContestListLoaded(contestList) {
  return {
    type: LOAD_CONTEST_LIST_SUCCESS,
    contestList,
  };
}

export function fContestListLoadingError(error) {
  return {
    type: LOAD_CONTEST_LIST_ERROR,
    error,
  };
}

export function openDrawer() {
  return {
    type: DRAWER_OPEN_SET_STATUS,
    isDrawerOpen: true,
  };
}
export function closeDrawer() {
  return {
    type: DRAWER_OPEN_SET_STATUS,
    isDrawerOpen: false,
  };
}
