import {createSelector} from 'reselect';

/**
 * Direct selector to the dancersPage state domain
 */
const selectDancersPageDomain = () => state => state.get('dancersPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DancersPage
 */

const selectDancersPage = () => createSelector(
  selectDancersPageDomain(),
  (substate) => substate.toJS()
);

export default selectDancersPage;
export {
  selectDancersPageDomain,
};
