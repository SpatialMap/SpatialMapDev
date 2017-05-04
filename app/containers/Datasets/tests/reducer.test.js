
import { fromJS } from 'immutable';
import datasetsReducer from '../reducer';

describe('datasetsReducer', () => {
  it('returns the initial state', () => {
    expect(datasetsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
