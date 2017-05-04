import { createSelector } from 'reselect';

/**
 * Direct selector to the datasets state domain
 */
const selectDatasetsDomain = () => (state) => state.get('datasets');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Datasets
 */

const makeSelectDatasets = () => createSelector(
  selectDatasetsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectDatasets;
export {
  selectDatasetsDomain,
};
