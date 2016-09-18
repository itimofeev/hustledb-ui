import { createSelector } from 'reselect';

/**
 * Direct selector to the competitionList state domain
 */
const selectCompetitionListDomain = () => state => state.get('competitionList');

/**
 * Other specific selectors
 */

const selectCompetitionListProp = () => createSelector(
  selectCompetitionListDomain(),
  (substate) => substate.get('competitionList')
);

/**
 * Default selector used by CompetitionList
 */

const selectCompetitionList = () => createSelector(
  selectCompetitionListDomain(),
  (substate) => substate.toJS()
);

export default selectCompetitionList;
export {
  selectCompetitionListDomain,
  selectCompetitionListProp,
};
