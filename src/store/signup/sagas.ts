/* eslint-disable */
import { all, fork, call, put, take, StrictEffect } from 'redux-saga/effects';
import { BrowserHistory } from 'history';
import signupUserService from './services';
import { SignupActionTypes } from './types';
import { signupUserSuccess, signupUserError } from './actions';
import { signupSuccess } from '../../actions';
import { history } from 'index';
import ROUTER_PATH from 'constants/RouterPath';

function* authorize({
                      email,
                      password,
                      redirect,
                    }: {
  email: string;
  password: string;
  redirect?: boolean;
}): Generator<StrictEffect, any, any> {

  try {

    const response = yield call(signupUserService, { email, password });
    yield put(signupUserSuccess({ ...response?.data }));
    yield put(signupSuccess());
    if (redirect) yield call(forwardTo, history, ROUTER_PATH.SIGNIN);

  } catch (err: any) {

    if (err instanceof Error) {
      return yield put(signupUserError({ ...(err.stack as any) }));
    }

    yield put(signupUserError('An unknown error occured.'));
  }
}

function forwardTo(history: BrowserHistory, url: any) {
  return history.push(url);
}

function* watchSignup(): any {
  while (true) {
    const { user } = yield take(SignupActionTypes.SIGNUP_USER_REQUEST);

    console.log('user user user', user);

    yield call(authorize, user);
  }
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* signupSaga() {
  yield all([fork(watchSignup)]);
}

export {
  authorize,
  signupSaga
};
