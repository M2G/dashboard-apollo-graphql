/*eslint-disable*/
import { call, put } from 'redux-saga/effects';
import {
  authorize
} from './sagas';
import {
  signinUserSuccess,
  signinUserError
} from './actions';
import signinService from 'store/signin/services';

describe('Auth saga', () => {
  describe('ForgotPassword saga', () => {
    const data = {
      data: {
        email: 'test@test.com',
        passord: 'test',
      }
    };

    describe('when authorize success', () => {
      test('should dispatch success action', () => {
        const saga = authorize({ ...data });
        const response = {
         data: {
           token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im0ucGllcnJlbG91aXNAaG90bWFpbC5mciIsInBhc3N3b3JkIjoiJDJiJDEwJEh6bGVCYlQ5dVlkMmNVZnlXZWlOMmVoYUg3aGtUbHlXWWFFYy5qWG13WDJtZHNxM2JkV00uIiwiaWF0IjoxNjU1MDgxMTA3LCJleHAiOjE2NTUwODQ3MDcsImF1ZCI6W10sInN1YiI6Im0ucGllcnJlbG91aXNAaG90bWFpbC5mciJ9.HEntwrdjY4jxGpHSVfDC2-RzK6pYT6aD2HNGxyb5Qzo',
         },
          status: 200,
        };

        expect(saga.next().value).toEqual(call(signinService, data));
        expect(saga.next(response).value).toEqual(put(signinUserSuccess(response)));
      });
    });

    describe('when authorize fail', () => {
      test('should dispatch fail action', () => {
        const saga = authorize({ ...data });

        const responseError = {
          status: 500,
          data: {
            errors: 'An unknown error occured.',
          }
        };

        expect(saga.next().value).toEqual(call(signinService, data));
        const result = saga.throw('An unknown error occured.');
        expect(result.value).toEqual(put(signinUserError(responseError.data.errors)));
      });
    });
  });
});
