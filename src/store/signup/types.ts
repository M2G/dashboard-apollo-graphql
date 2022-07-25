/* eslint-disable */
/*
 * Response object for GET /heroes
 * https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Signup extends ApiResponse {
  email: string;
  password: string;
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

// eslint-disable-next-line import/prefer-default-export
export enum SignupActionTypes {
  SIGNUP_USER_REQUEST = '@@signup/SIGNUP_USER_REQUEST',
  SIGNUP_USER_SUCCESS = '@@signup/SIGNUP_USER_SUCCESS',
  SIGNUP_USER_ERROR = '@@signup/SIGNUP_USER_ERROR',
}

/*
 * Declare state types with `readonly` modifier to get compile time immutability.
 * https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
 */
export interface SignupState {
  readonly loading: boolean;
  readonly data: Signup[];
  readonly errors?: string;
}
