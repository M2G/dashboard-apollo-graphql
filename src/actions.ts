/* eslint-disable */
import { AuthActionTypes } from './types';

function signinSuccess() {
  console.log('isAuthenticated');
  return {
    isAuthenticated: true,
    type: AuthActionTypes.SIGNIN_SUCCESS_GLOBAL,
  };
}

function signupSuccess() {
  return {
    isAuthenticated: true,
    type: AuthActionTypes.SIGNUP_SUCCESS_GLOBAL,
  };
}

function signoutSuccess() {
  return {
    isAuthenticated: false,
    type: AuthActionTypes.SIGNOUT_SUCCESS_GLOBAL,
  };
}

export { signinSuccess, signoutSuccess, signupSuccess };
