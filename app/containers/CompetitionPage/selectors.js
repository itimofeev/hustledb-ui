import { createSelector } from 'reselect';

/**
 * Direct selector to the competitionPage state domain
 */
const selectCompetitionPageDomain = () => state => state.get('competitionPage');

/**
 * Other specific selectors
 */


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
};
