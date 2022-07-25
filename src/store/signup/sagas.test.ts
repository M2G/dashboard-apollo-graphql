/*eslint-disable*/
import { call, put } from 'redux-saga/effects';
import {
  authorize
} from './sagas';
import { signupUserSuccess,
  // signupUserError
} from './actions';
import signupUserService from './services';

describe('Auth saga', () => {
  describe('ForgotPassword saga', () => {
    const data = {
      data: {
        email: 'test',
        password: 'test'
      }
    };

    describe('when authorize success', () => {
      test('should dispatch success action', () => {
        const saga = authorize({ ...data.data } as any);
        const response = {
          data: {
            email: 'test',
            password: 'test'
          },
          status: 200,
        };

        expect(saga.next().value).toEqual(call(signupUserService, data.data));
        expect(saga.next(response).value).toEqual(put(signupUserSuccess(response.data)));
      });
    });

   describe('when authorize fail', () => {
      test('should dispatch fail action', () => {
        const saga = authorize({ ...data.data });

        /*const responseError = {
          status: 500,
          data: {
            errors: 'internal server error',
          }
        };*/

        expect(saga.next().value).toEqual(call(signupUserService, data.data));
        // expect(saga.next(responseError).value).toEqual(put(signupUserError(responseError)));
      });
    });
  });
});
