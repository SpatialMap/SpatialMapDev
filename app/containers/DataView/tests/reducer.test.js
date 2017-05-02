
import { fromJS } from 'immutable';
import dataViewReducer from '../reducer';

describe('dataViewReducer', () => {
  it('returns the initial state', () => {
    expect(dataViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
