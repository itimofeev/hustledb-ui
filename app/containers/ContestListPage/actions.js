/*
 *
 * ContestListPage actions
 *
 */
export const CONTEST_SELECTED = 'app/HomePage/CONTEST_SELECTED';
export const CHANGE_SMALL_WIDTH = 'app/HomePage/CHANGE_SMALL_WIDTH';

export function contestSelected(contest) {
  return {
    type: CONTEST_SELECTED,
    contest,
  };
}

export function changeSmallWidth(smallWidth) {
  return {
    type: CHANGE_SMALL_WIDTH,
    smallWidth,
  };
}
