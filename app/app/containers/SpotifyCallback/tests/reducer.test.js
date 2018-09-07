import { fromJS } from 'immutable';
import testReducer from '../reducer';

describe('testReducer', () => {
  it('returns the initial state', () => {
    expect(testReducer(undefined, {})).toEqual(fromJS({}));
  });
});
