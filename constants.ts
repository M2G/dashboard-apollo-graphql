/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'fr';
export const SIGNIN_SUCCESS_GLOBAL = '@@signin/SIGNIN_SUCCESS_GLOBAL';
export const SIGNUP_SUCCESS_GLOBAL = '@@signup/SIGNUP_SUCCESS_GLOBAL';
export const SIGNOUT_SUCCESS_GLOBAL = '@@signout/SIGNOUT_SUCCESS_GLOBAL';
