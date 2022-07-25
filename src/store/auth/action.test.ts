import * as actions from './actions';
import { AuthActionTypes } from "./types";

describe('todo actions', () => {
  it('authUpdateUserProfilAction should create AUTH_UPDATE_USER_PROFIL_REQUEST action', () => {
    expect(actions.authUpdateUserProfilAction({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_REQUEST,
    });
  });

  it('authDeleteUserProfilAction should create AUTH_DELETE_USER_PROFIL_REQUEST action', () => {
    expect(actions.authDeleteUserProfilAction({})).toEqual({
      id: {},
      type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_REQUEST,
    });
  });

  it('authDeleteUserProfilSuccess should create AUTH_DELETE_USER_PROFIL_SUCCESS action', () => {
    expect(actions.authDeleteUserProfilSuccess()).toEqual({
      type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_SUCCESS,
    });
  });

  it('authDeleteUserProfilError should create AUTH_DELETE_USER_PROFIL_ERROR action', () => {
    expect(actions.authDeleteUserProfilError({})).toEqual({
      errors: {},
      type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_ERROR,
    });
  });

  it('authGetUserProfilErrorAction should create AUTH_GET_USER_PROFIL_REQUEST action', () => {
    expect(actions.authGetUserProfilErrorAction({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_GET_USER_PROFIL_REQUEST,
    });
  });

  it('authGetUsersProfilAction should create AUTH_GET_USERS_PROFIL_REQUEST action', () => {
    expect(actions.authGetUsersProfilAction({})).toEqual({
      type: AuthActionTypes.AUTH_GET_USERS_PROFIL_REQUEST,
    });
  });

  it('authUpdatePasswordAction should create AUTH_UPDATE_PASSWORD_REQUEST action', () => {
    expect(actions.authUpdatePasswordAction({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_UPDATE_PASSWORD_REQUEST,
    });
  });

  it('authRecoverPasswordAction should create AUTH_RECOVER_PASSWORD_REQUEST action', () => {
    expect(actions.authRecoverPasswordAction({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_RECOVER_PASSWORD_REQUEST,
    });
  });

  it('authForgotPasswordAction should create AUTH_FORGOT_PASSWORD_REQUEST action', () => {
    expect(actions.authForgotPasswordAction({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_FORGOT_PASSWORD_REQUEST,
    });
  });

  it('authForgotPasswordError should create AUTH_FORGOT_PASSWORD_ERROR action', () => {
    expect(actions.authForgotPasswordError({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_FORGOT_PASSWORD_ERROR,
    });
  });

  it('authForgotPasswordError authUpdateUserProfilSuccess create AUTH_UPDATE_USER_PROFIL_SUCCESS action', () => {
    expect(actions.authUpdateUserProfilSuccess()).toEqual({
      type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_SUCCESS,
    });
  });

  it('authUpdateUserProfilError should create AUTH_UPDATE_USER_PROFIL_ERROR action', () => {
    expect(actions.authUpdateUserProfilError({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_ERROR,
    });
  });

  it('authGetUsersProfilSuccess should create AUTH_GET_USERS_PROFIL_SUCCESS action', () => {
    expect(actions.authGetUsersProfilSuccess({})).toEqual({
      data: undefined,
      type: AuthActionTypes.AUTH_GET_USERS_PROFIL_SUCCESS,
    });
  });

  it('authGetUserProfilSuccess should create AUTH_GET_USER_PROFIL_SUCCESS action', () => {
    expect(actions.authGetUserProfilSuccess({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_GET_USER_PROFIL_SUCCESS,
    });
  });

  it('authGetUserProfilError should create AUTH_GET_USER_PROFIL_ERROR action', () => {
    expect(actions.authGetUserProfilError({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_GET_USER_PROFIL_ERROR,
    });
  });

  it('authGetUsersProfilError should create AUTH_GET_USERS_PROFIL_ERROR action', () => {
    expect(actions.authGetUsersProfilError({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_GET_USERS_PROFIL_ERROR,
    });
  });

  it('authUpdatePasswordSuccess should create AUTH_UPDATE_PASSWORD_SUCCESS action', () => {
    expect(actions.authUpdatePasswordSuccess({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_UPDATE_PASSWORD_SUCCESS,
    });
  });

  it('authRecoverPasswordSuccess should create AUTH_RECOVER_PASSWORD_SUCCESS action', () => {
    expect(actions.authRecoverPasswordSuccess({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_RECOVER_PASSWORD_SUCCESS,
    });
  });

  it('authRecoverPasswordError should create AUTH_RECOVER_PASSWORD_ERROR action', () => {
    expect(actions.authRecoverPasswordError({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_RECOVER_PASSWORD_ERROR,
    });
  });

  it('authForgotPasswordSuccess should create AUTH_FORGOT_PASSWORD_SUCCESS action', () => {
    expect(actions.authForgotPasswordSuccess({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_FORGOT_PASSWORD_SUCCESS,
    });
  });

  it('authRequestErrorAction should create AUTH_REQUEST_ERROR action', () => {
    expect(actions.authRequestErrorAction({})).toEqual({
      data: {},
      type: AuthActionTypes.AUTH_REQUEST_ERROR,
    });
  });
});
