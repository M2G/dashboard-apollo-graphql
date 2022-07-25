/* eslint-disable */
import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import { authReducer } from './auth/reducers';
import { signinReducer } from './signin/reducers';
import { signupReducer } from './signup/reducers';
import { signoutReducer } from './signout/reducers';
import { authGlobalReducer } from '../reducers';

import { authSaga } from './auth/sagas';
import { signinSaga } from './signin/sagas';
import { signupSaga } from './signup/sagas';
import { signoutSaga } from './signout/sagas';


import { AuthState } from './auth/types';
import { SigninState } from './signin/types';
import { SignupState } from './signup/types';
import { SignoutState } from './signout/types';
import { AuthGlobalState } from '../types';

// The top-level state object
export interface ApplicationState {
  signin: SigninState;
  signup: SignupState;
  signout: SignoutState;
  auth: AuthState;
  auth_global: AuthGlobalState;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types

/*
 * Whenever an action is dispatched, Redux will update each top-level application state property
 * using the reducer with the matching name. It's important that the names match exactly, and that
 * the reducer acts on the corresponding ApplicationState property type.
 */
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types,@typescript-eslint/no-unused-vars-experimental
function rootReducer() {
  return combineReducers({
    auth: authReducer,
    auth_global: authGlobalReducer,
    signup: signupReducer,
    //signinplatform: signinPlatformReducer,
    signin: signinReducer,
    signout: signoutReducer,
  });
}

/*
 * Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
 * "generator function", which you can read about here:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
 */
function* rootSaga() {
  yield all([
    fork(signinSaga),
    fork(signupSaga),
    fork(signoutSaga),
    fork(authSaga),
  ]);
}
//@ts-ignore
export { rootSaga, rootReducer, ApplicationState };
