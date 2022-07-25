/* eslint-disable */
// @see https://github.com/diegohaz/redux-saga-social-login/blob/master/src/store/social/sagas.js
// @see https://github.com/redux-saga/redux-saga/issues/14

import { all, fork, call, put, take, StrictEffect } from 'redux-saga/effects';
import signinService from './services';
import { SigninActionTypes } from './types';
import { signinUserSuccess, signinUserError } from './actions';
import { signinSuccess } from '../../actions';
import { setAuthStorage } from 'services/Storage';
import Config from 'constants/index';
import { history } from 'index';
import ROUTER_PATH from 'constants/RouterPath';

function* authorize({ ...params }): Generator<StrictEffect, any, any> {
   try {
    const response = yield call(signinService, params);
        yield put(signinUserSuccess(response));

        const { data: { token } } = response?.data;
        Config.GLOBAL_VAR.token = token;

        yield call(setAuthStorage, token);
        yield put(signinSuccess());
        yield call(forwardTo, history, ROUTER_PATH.HOME);

    } catch (err: any) {

     if (err instanceof Error) {
      return yield put(signinUserError({ ...(err.stack as any) }));
     }

     yield put(signinUserError("An unknown error occured."));

   }
}

function* watchSignin(): any {
  while (true) {
    const request = yield take(SigninActionTypes.SIGNIN_USER_REQUEST);
    yield call(authorize, { ...request?.user });
  }
}

function forwardTo(history: { push: Function }, location: string) {
  return history.push({ pathname: location });
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* signinSaga(): any {
  yield all([fork(watchSignin)]);
}

export {
  authorize,
  signinSaga
};
