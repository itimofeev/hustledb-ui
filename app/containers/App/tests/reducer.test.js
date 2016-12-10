import expect from 'expect';
import appReducer from '../reducer';
import {
  loadFCompList,
  fCompListLoaded,
  fCompListLoadingError,
} from '../actions';
import { fromJS } from 'immutable';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: false,
      userData: fromJS({
        repositories: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadFCompList action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'repositories'], false);

    expect(appReducer(state, loadFCompList())).toEqual(expectedResult);
  });

  it('should handle the fCompListLoaded action correctly', () => {
    const fixture = [{
      name: 'My Repo',
    }];
    const username = 'test';
    const expectedResult = state
      .setIn(['userData', 'repositories'], fixture)
      .set('loading', false)
      .set('currentUser', username);

    expect(appReducer(state, fCompListLoaded(fixture, username))).toEqual(expectedResult);
  });

  it('should handle the fCompListLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, fCompListLoadingError(fixture))).toEqual(expectedResult);
  });
});
