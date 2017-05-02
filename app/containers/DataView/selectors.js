import { createSelector } from 'reselect';

/**
 * Direct selector to the dataView state domain
 */
const selectDataViewDomain = () => (state) => state.get('dataView');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DataView
 */

const makeSelectDataView = () => createSelector(
  selectDataViewDomain(),
  (substate) => substate.toJS()
);

export default makeSelectDataView;
export {
  selectDataViewDomain,
};
