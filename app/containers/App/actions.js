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


export const LOAD_FCOMP_LIST = 'vhustle/App/LOAD_FCOMP_LIST';
export const LOAD_FCOMP_LIST_SUCCESS = 'vhustle/App/LOAD_FCOMP_LIST_SUCCESS';
export const LOAD_FCOMP_LIST_ERROR = 'vhustle/App/LOAD_FCOMP_LIST_ERROR';

export function loadFCompList() {
  return {
    type: LOAD_FCOMP_LIST,
  };
}

export function fCompListLoaded(fCompList) {
  return {
    type: LOAD_FCOMP_LIST_SUCCESS,
    fCompList,
  };
}

export function fCompListLoadingError(error) {
  return {
    type: LOAD_FCOMP_LIST_ERROR,
    error,
  };
}
