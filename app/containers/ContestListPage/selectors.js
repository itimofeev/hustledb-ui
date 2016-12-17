import { createSelector } from 'reselect';

/**
 * Direct selector to the ContestListPage state domain
 */
const selectContestListDomain = () => state => state.get('contestList');

/**
 * Other specific selectors
 */

const selectSelectedContest = () => createSelector(
  selectContestListDomain(),
  (substate) => substate.get('selectedContest')
);

const selectSmallWidth = () => createSelector(
  selectContestListDomain(),
  (substate) => substate.get('smallWidth')
);
/**
 * Default selector used by ContestListPage
 */

const selectContestList = () => createSelector(
  selectContestListDomain(),
  (substate) => substate.toJS()
);

export default selectContestList;
export {
  selectContestListDomain,
  selectSmallWidth,
  selectSelectedContest,
};