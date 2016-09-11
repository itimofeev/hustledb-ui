import expect from 'expect';
import dancerProfileReducer from '../reducer';
import { fromJS } from 'immutable';

describe('dancerProfileReducer', () => {
  it('returns the initial state', () => {
    expect(dancerProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
