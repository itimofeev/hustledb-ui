import { createSelector } from 'reselect';

/**
 * Direct selector to the dancerProfile state domain
 */
const selectDancerProfileDomain = () => state => state.get('dancerProfile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DancerProfile
 */

const selectDancerProfile = () => createSelector(
  selectDancerProfileDomain(),
  (substate) => substate.toJS()
);

export default selectDancerProfile;
export {
  selectDancerProfileDomain,
};
