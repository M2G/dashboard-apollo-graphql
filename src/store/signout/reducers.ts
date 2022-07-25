/* eslint-disable */
import { Reducer } from 'redux';
import { SignoutActionTypes, SignoutState } from './types';

// Type-safe initialState!
export const initialState: SignoutState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<SignoutState> = (
  state = initialState,
  action,
) => {

  console.log('--------> signoutReducer state', state)
  console.log('--------> signoutReducer action', action)
  const { user, type } = action;
  if (type === SignoutActionTypes.SIGNOUT_USER_REQUEST) {
    return { ...state, loading: true, data: user };
  }

  return state;
};

/*
 * Instead of using default export, we use named exports. That way we can group these exports
 * inside the `index.js` folder.
 */
export { reducer as signoutReducer };
