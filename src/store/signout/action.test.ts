import * as actions from './actions';
import { SignoutActionTypes } from "./types";

describe('todo actions', () => {
  it('authUpdateUserProfilAction should create SIGNIN_USER_PREPARE action', () => {
    expect(actions.signoutUserAction({})).toEqual({
      type: SignoutActionTypes.SIGNOUT_USER_REQUEST,
    });
  });
});
