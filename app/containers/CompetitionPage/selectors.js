import { createSelector } from 'reselect';

/**
 * Direct selector to the competitionPage state domain
 */
const selectCompetitionPageDomain = () => state => state.get('competitionPage');

/**
 * Other specific selectors
 */
const selectCompetition = () => createSelector(
  selectCompetitionPageDomain(),
  (substate) => substate.get('competition')
);

const selectLoading = () => createSelector(
  selectCompetitionPageDomain(),
  (substate) => substate.get('loading')
);

const selectError = () => createSelector(
  selectCompetitionPageDomain(),
  (substate) => substate.get('error')
);

/**
 * Default selector used by CompetitionPage
 */

const selectCompetitionPage = () => createSelector(
  selectCompetitionPageDomain(),
  (substate) => substate.toJS()
);

export default selectCompetitionPage;
export {
  selectCompetitionPageDomain,
  selectCompetition,
  selectError,
  selectLoading,
};
