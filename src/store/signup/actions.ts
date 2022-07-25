/* eslint-disable */
import { SignupActionTypes } from './types';

function signupUserAction(user: any){
  console.log('registerUserAction', user);
  return {
    type: SignupActionTypes.SIGNUP_USER_REQUEST,
    user,
  };
}

function signupUserSuccess(user?: any){
  console.log('registerUserSuccess', user);
  return {
    type: SignupActionTypes.SIGNUP_USER_SUCCESS,
    ...user
  };
}

function signupUserError(user: any){
  console.log('registerUserError', user);
  return {
    type: SignupActionTypes.SIGNUP_USER_ERROR,
    user,
  };
}

export { signupUserAction, signupUserSuccess, signupUserError };
