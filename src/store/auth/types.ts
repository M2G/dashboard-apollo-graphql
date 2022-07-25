/* eslint-disable */
/*
 * Response object for GET /heroes
 * https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
 */

export interface Auth extends ApiResponse {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  created_at: string;
  modified_at?: string;
}

/*
 * This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
 * the expected return type of your API response.
 */
export type ApiResponse = Record<string, any>;

/*
 * Use `enum`s for better autocompletion of action type names. These will
 * be compiled away leaving only the final value in your compiled code.
 *
 * Define however naming conventions you'd like for your action types, but
 * personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
 * of Redux's `@@INIT` action.
 */

export enum AuthActionTypes {
  AUTH_GET_USER_PROFIL_REQUEST = '@@auth/AUTH_GET_USER_PROFIL_REQUEST',
  AUTH_GET_USERS_PROFIL_REQUEST = '@@auth/AUTH_GET_USERS_PROFIL_REQUEST',
  AUTH_UPDATE_USER_PROFIL_REQUEST = '@@auth/AUTH_UPDATE_USER_PROFIL_REQUEST',
  AUTH_UPDATE_PASSWORD_REQUEST = '@@auth/AUTH_UPDATE_PASSWORD_REQUEST',
  AUTH_RECOVER_PASSWORD_REQUEST = '@@auth/AUTH_RECOVER_PASSWORD_REQUEST',
  AUTH_FORGOT_PASSWORD_REQUEST = '@@auth/AUTH_FORGOT_PASSWORD_REQUEST',
  AUTH_DELETE_USER_PROFIL_REQUEST = '@@auth/AUTH_DELETE_USER_PROFIL_REQUEST',

  AUTH_GET_USER_PROFIL_SUCCESS = '@@auth/AUTH_GET_USER_PROFIL_SUCCESS',
  AUTH_GET_USERS_PROFIL_SUCCESS = '@@auth/AUTH_GET_USERS_PROFIL_SUCCESS',
  AUTH_DELETE_USER_PROFIL_SUCCESS = '@@auth/AUTH_DELETE_USER_PROFIL_SUCCESS',
  AUTH_UPDATE_USER_PROFIL_SUCCESS = '@@auth/AUTH_UPDATE_USER_PROFIL_SUCCESS',
  AUTH_UPDATE_PASSWORD_SUCCESS = '@@auth/AUTH_UPDATE_PASSWORD_SUCCESS',
  AUTH_RECOVER_PASSWORD_SUCCESS = '@@auth/AUTH_RECOVER_PASSWORD_SUCCESS',
  AUTH_FORGOT_PASSWORD_SUCCESS = '@@auth/AUTH_FORGOT_PASSWORD_SUCCESS',

  AUTH_DELETE_USER_PROFIL_ERROR = '@@auth/AUTH_DELETE_USER_PROFIL_ERROR',
  AUTH_GET_USER_PROFIL_ERROR = '@@auth/AUTH_GET_USER_PROFIL_ERROR',
  AUTH_GET_USERS_PROFIL_ERROR = '@@auth/AUTH_GET_USERS_PROFIL_ERROR',
  AUTH_UPDATE_USER_PROFIL_ERROR = '@@auth/AUTH_UPDATE_USER_PROFIL_ERROR',
  AUTH_UPDATE_PASSWORD_ERROR = '@@auth/AUTH_UPDATE_PASSWORD_ERROR',
  AUTH_RECOVER_PASSWORD_ERROR = '@@auth/AUTH_RECOVER_PASSWORD_ERROR',
  AUTH_FORGOT_PASSWORD_ERROR = '@@auth/AUTH_FORGOT_PASSWORD_ERROR',
  AUTH_REQUEST_ERROR = '@@auth/AUTH_REQUEST_ERROR',
}

/*
 * Declare state types with `readonly` modifier to get compile time immutability.
 * https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
 */
export interface AuthState {
  readonly loading: boolean;
  readonly data: Auth[];
  readonly errors?: string;
}
