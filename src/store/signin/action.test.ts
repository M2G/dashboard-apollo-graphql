import * as actions from './actions';
import { SigninActionTypes } from "./types";

describe('todo actions', () => {
  it('authUpdateUserProfilAction should create SIGNIN_USER_PREPARE action', () => {
    expect(actions.signinUserPrepare({}, {})).toEqual({
      options: {},
      type: SigninActionTypes.SIGNIN_USER_PREPARE,
      user: {},
    });
  });

  it('authDeleteUserProfilAction should create SIGNIN_USER_REQUEST action', () => {
    expect(actions.signinUserAction({})).toEqual({
      type: SigninActionTypes.SIGNIN_USER_REQUEST,
      user: {},
    });
  });

  it('authDeleteUserProfilSuccess should create SIGNIN_USER_SUCCESS action', () => {
    expect(actions.signinUserSuccess({})).toEqual({
      type: SigninActionTypes.SIGNIN_USER_SUCCESS,
      user: {},
    });
  });

  it('authDeleteUserProfilSuccess should create SIGNIN_USER_ERROR action', () => {
    expect(actions.signinUserError({})).toEqual({
      errors: {},
      type: SigninActionTypes.SIGNIN_USER_ERROR,
    });
  });
});
