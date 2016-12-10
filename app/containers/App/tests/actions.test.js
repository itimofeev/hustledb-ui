import expect from 'expect';

import {
  LOAD_FCOMP_LIST,
  LOAD_FCOMP_LIST_SUCCESS,
  LOAD_FCOMP_LIST_ERROR,
} from '../actions';

import {
  loadFCompList,
  fCompListLoaded,
  fCompListLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadFCompList', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_FCOMP_LIST,
      };

      expect(loadFCompList()).toEqual(expectedResult);
    });
  });

  describe('fCompListLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_FCOMP_LIST_SUCCESS,
        repos: fixture,
        username,
      };

      expect(fCompListLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('fCompListLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_FCOMP_LIST_ERROR,
        error: fixture,
      };

      expect(fCompListLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
