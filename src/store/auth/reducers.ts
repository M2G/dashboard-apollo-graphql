/* eslint-disable */
import { Reducer } from 'redux';
import { AuthActionTypes, AuthState } from './types';

// Type-safe initialState!
export const initialState: AuthState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  const { data, errors, type } = action || {};

  console.log('------------------> AUTH action', action);
  console.log('------------------> AUTH state', state);

  switch (type) {
    case AuthActionTypes.AUTH_GET_USER_PROFIL_REQUEST:
      return { ...state, loading: true };
    case AuthActionTypes.AUTH_GET_USERS_PROFIL_REQUEST:
      return { ...state, loading: true };
    case AuthActionTypes.AUTH_UPDATE_USER_PROFIL_REQUEST:
      return { ...state, loading: true };
    case AuthActionTypes.AUTH_UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case AuthActionTypes.AUTH_RECOVER_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case AuthActionTypes.AUTH_FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case AuthActionTypes.AUTH_DELETE_USER_PROFIL_REQUEST:
      return { ...state, loading: true };

    case AuthActionTypes.AUTH_GET_USER_PROFIL_SUCCESS:
      return { ...state, loading: false, data };
    case AuthActionTypes.AUTH_GET_USERS_PROFIL_SUCCESS:
      return { ...state, loading: false, data };
    case AuthActionTypes.AUTH_UPDATE_USER_PROFIL_SUCCESS:
      return { ...state, loading: false };
    case AuthActionTypes.AUTH_UPDATE_PASSWORD_SUCCESS:
      return { ...state, loading: false, data };
    case AuthActionTypes.AUTH_RECOVER_PASSWORD_SUCCESS:
      return { ...state, loading: false, data };
    case AuthActionTypes.AUTH_FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, data };
    case AuthActionTypes.AUTH_DELETE_USER_PROFIL_SUCCESS:
      return { ...state, loading: false };

    case AuthActionTypes.AUTH_DELETE_USER_PROFIL_ERROR:
      return { ...state, loading: false, errors };
    case AuthActionTypes.AUTH_GET_USER_PROFIL_ERROR:
      return { ...state, loading: false, errors: data };
    case AuthActionTypes.AUTH_GET_USERS_PROFIL_ERROR:
      return { ...state, loading: false, errors: data };
    case AuthActionTypes.AUTH_UPDATE_USER_PROFIL_ERROR:
      return { ...state, loading: false, errors: data };
    case AuthActionTypes.AUTH_UPDATE_PASSWORD_ERROR:
      return { ...state, loading: false, errors: data };
    case AuthActionTypes.AUTH_RECOVER_PASSWORD_ERROR:
      return { ...state, loading: false, errors: data };
    case AuthActionTypes.AUTH_FORGOT_PASSWORD_ERROR:
      return { ...state, loading: false, errors: data };
    case AuthActionTypes.AUTH_REQUEST_ERROR:
      return { ...state, loading: false, errors };

    default:
      return state;
  }
};

/*
 * Instead of using default export, we use named exports. That way we can group these exports
 * inside the `index.js` folder.
 */
export { reducer as authReducer };
