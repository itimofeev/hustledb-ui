import { createSelector } from 'reselect';

/**
 * Direct selector to the competitionListPage state domain
 */
const selectCompetitionListDomain = () => state => state.get('competitionList');

/**
 * Other specific selectors
 */

const selectSelectedCompetition = () => createSelector(
  selectCompetitionListDomain(),
  (substate) => substate.get('selectedCompetition')
);

const selectSmallWidth = () => createSelector(
  selectCompetitionListDomain(),
  (substate) => substate.get('smallWidth')
);
/**
 * Default selector used by CompetitionListPage
 */

const selectCompetitionList = () => createSelector(
  selectCompetitionListDomain(),
  (substate) => substate.toJS()
);

export default selectCompetitionList;
export {
  selectCompetitionListDomain,
  selectSmallWidth,
  selectSelectedCompetition,
};
