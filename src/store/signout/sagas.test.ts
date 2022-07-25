/*eslint-disable*/
import { call } from 'redux-saga/effects';
import {
  signoutRequest,
  signoutFlow,
} from './sagas';

describe('Auth saga', () => {
  describe('signout saga', () => {
    describe('when signoutRequest success', () => {
      test('should dispatch success action', () => {
        const saga = signoutRequest();
        expect(saga.next().value).toEqual(call(signoutFlow));
      });
    });
  });
});
