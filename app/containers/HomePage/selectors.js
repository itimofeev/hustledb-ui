/**
 * Homepage selectors
 */
import { createSelector } from 'reselect';


const selectHome = () => (state) => state.get('home');

const selectSelectedCompetition = () => createSelector(
  selectHome(),
  (home) => home.get('selectedCompetition')
);

const selectSmallWidth = () => createSelector(
  selectHome(),
  (home) => home.get('smallWidth')
);

export {
  selectHome,
  selectSelectedCompetition,
  selectSmallWidth,
};
