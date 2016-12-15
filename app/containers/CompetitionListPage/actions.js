/*
 *
 * CompetitionListPage actions
 *
 */
export const COMPETITION_SELECTED = 'app/HomePage/COMPETITION_SELECTED';
export const CHANGE_SMALL_WIDTH = 'app/HomePage/CHANGE_SMALL_WIDTH';

export function competitionSelected(competition) {
  return {
    type: COMPETITION_SELECTED,
    competition,
  };
}

export function changeSmallWidth(smallWidth) {
  return {
    type: CHANGE_SMALL_WIDTH,
    smallWidth,
  };
}
