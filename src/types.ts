/* eslint-disable */
/*
 * Response object for GET /heroes
 * https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
 */

export enum AuthActionTypes {
  SIGNIN_SUCCESS_GLOBAL = '@@signin/SIGNIN_SUCCESS_GLOBAL',
  SIGNUP_SUCCESS_GLOBAL = '@@signup/SIGNUP_SUCCESS_GLOBAL',
  SIGNOUT_SUCCESS_GLOBAL = '@@signout/SIGNOUT_SUCCESS_GLOBAL',
}

/*
 * Declare state types with `readonly` modifier to get compile time immutability.
 * https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
 */
export interface AuthGlobalState {
  readonly isAuthenticated: boolean;
}
