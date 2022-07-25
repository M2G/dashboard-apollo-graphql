import * as actions from './actions';
import { SignupActionTypes } from "./types";

describe('todo actions', () => {
  it('signupUserAction should create SIGNUP_USER_REQUEST action', () => {
    expect(actions.signupUserAction({})).toEqual({
      type: SignupActionTypes.SIGNUP_USER_REQUEST,
      user: {},
    });
  });

  it('signupUserSuccess should create SIGNUP_USER_SUCCESS action', () => {
    expect(actions.signupUserSuccess({})).toEqual({
      type: SignupActionTypes.SIGNUP_USER_SUCCESS,
    });
  });

  it('signupUserError should create SIGNUP_USER_ERROR action', () => {
    expect(actions.signupUserError({})).toEqual({
      type: SignupActionTypes.SIGNUP_USER_ERROR,
      user: {},
    });
  });
});
