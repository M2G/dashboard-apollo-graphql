/* eslint-disable */
import { AuthActionTypes } from './types';

export const authUpdateUserProfilAction = (data: any) => {
  console.log('AUTH_UPDATE_USER_PROFIL_REQUEST', data);
  return {
    type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_REQUEST,
    data,
  };
};

export const authDeleteUserProfilAction = (id: any) => {
  console.log('AUTH_DELETE_USER_PROFIL_REQUEST', id);
  return {
    type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_REQUEST,
    id,
  };
};

export const authDeleteUserProfilSuccess = () => {
  return {
    type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_SUCCESS,
  };
};

export const authDeleteUserProfilError = (errors: any) => {
  console.log('AUTH_DELETE_USER_PROFIL_ERROR', errors);
  return {
    type: AuthActionTypes.AUTH_DELETE_USER_PROFIL_ERROR,
    errors,
  };
};

export const authGetUserProfilErrorAction = (data: any) => {
  console.log('AUTH_GET_USER_PROFIL_REQUEST', data);
  return {
    type: AuthActionTypes.AUTH_GET_USER_PROFIL_REQUEST,
    data,
  };
};

export const authGetUsersProfilAction = (args?: any) => {
  console.log('AUTH_GET_USERS_PROFIL_REQUEST', args);
  return {
    type: AuthActionTypes.AUTH_GET_USERS_PROFIL_REQUEST,
    ...args,
  };
};

export const authUpdatePasswordAction = (data: any) => {
  console.log('authUpdatePasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_UPDATE_PASSWORD_REQUEST,
    data,
  };
};

export const authRecoverPasswordAction = (data: any) => {
  console.log('authRecoverPasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_RECOVER_PASSWORD_REQUEST,
    data,
  };
};

export const authForgotPasswordAction = (data: any) => {
  console.log('authForgotPasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_FORGOT_PASSWORD_REQUEST,
    data,
  };
};

export const authForgotPasswordError = (data: any) => {
  console.log('authForgotPasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_FORGOT_PASSWORD_ERROR,
    data,
  };
};

export const authUpdateUserProfilSuccess = () => {
  return {
    type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_SUCCESS,
  };
};

export const authUpdateUserProfilError = (data: any) => {
  console.log('authUpdateUserProfilError', data);
  return {
    type: AuthActionTypes.AUTH_UPDATE_USER_PROFIL_ERROR,
    data,
  };
};

export const authGetUsersProfilSuccess = ({ data, ...args }: any) => {
  console.log('authGetUsersProfilSuccess', data, args);
  return {
    type: AuthActionTypes.AUTH_GET_USERS_PROFIL_SUCCESS,
    data,
    ...args,
  };
};

export const authGetUserProfilSuccess = (data: any) => {
  console.log('authUpdateUserProfilAction', data);
  return {
    type: AuthActionTypes.AUTH_GET_USER_PROFIL_SUCCESS,
    data,
  };
};

export const authGetUserProfilError = (data: any) => {
  console.log('authGetUserProfilError', data);
  return {
    type: AuthActionTypes.AUTH_GET_USER_PROFIL_ERROR,
    data,
  };
};

export const authGetUsersProfilError = (data: any) => {
  console.log('authGetUserProfilError', data);
  return {
    type: AuthActionTypes.AUTH_GET_USERS_PROFIL_ERROR,
    data,
  };
};

export const authUpdatePasswordSuccess = (data: any) => {
  console.log('authUpdatePasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_UPDATE_PASSWORD_SUCCESS,
    data,
  };
};

export const authRecoverPasswordSuccess = (data: any) => {
  console.log('authRecoverPasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_RECOVER_PASSWORD_SUCCESS,
    data,
  };
};

export const authRecoverPasswordError = (data: any) => {
  console.log('authRecoverPasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_RECOVER_PASSWORD_ERROR,
    data,
  };
};

export const authForgotPasswordSuccess = (data: any) => {
  console.log('authForgotPasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_FORGOT_PASSWORD_SUCCESS,
    data,
  };
};

export const authRequestErrorAction = (data: any) => {
  console.log('authForgotPasswordAction', data);
  return {
    type: AuthActionTypes.AUTH_REQUEST_ERROR,
    data,
  };
};
