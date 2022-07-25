/* eslint-disable */
import { Reducer } from 'redux';
import { SigninActionTypes, SigninState } from './types';

// Type-safe initialState!
export const initialState: SigninState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<SigninState> = (state = initialState, action) => {
  const { data = {}, errors, type } = action || {};

  console.log('------------------> SIGNIN action', action);
  console.log('------------------> SIGNIN state', state);

  switch (type) {
    case SigninActionTypes.SIGNIN_USER_REQUEST:
      return { ...state, loading: true };
    case SigninActionTypes.SIGNIN_USER_SUCCESS:
      return { ...state, loading: false, data };
    case SigninActionTypes.SIGNIN_USER_ERROR:
      return { ...state, loading: false, errors };
    default:
      return state;
  }
};

/*
 * Instead of using default export, we use named exports. That way we can group these exports
 * inside the `index.js` folder.
 */
export { reducer as signinReducer };
