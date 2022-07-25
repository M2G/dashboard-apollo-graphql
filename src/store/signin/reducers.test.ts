import { signinReducer } from './reducers';

describe('todos reducer', () => {
  const data = [{
    data: {
      success: true,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNtaXRoLmphY2tzb25AdW5pdmVyc2l0eS5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCR6WndaOUZ1dUhReGpXUUFRUUZjNmNPVWo1OVVmVU1aTHA3Ly5wR1FpeVMzYUJzWWxLZ1hCZSIsImlhdCI6MTY1NjYzNjU2MCwiZXhwIjoxNjU2NjQwMTYwLCJhdWQiOltdLCJzdWIiOiJzbWl0aC5qYWNrc29uQHVuaXZlcnNpdHkuY29tIn0.yYR7R_CXDk7F4Jnx37BT0KGJSrN4XRElohUfAizxH3U",
    },
    date: "2022-07-01T00:49:20.760Z",
    success: true,
  }];

  it('should handle initial state', () => {
   expect(
     signinReducer(undefined, { data: [], errors: {}, type: '' }),
     ).toEqual({ data: [], errors: undefined, loading: false});
  });

  it('should handle SIGNIN_USER_REQUEST', () => {
    expect(
      signinReducer(
        { data: [], errors: undefined, loading: false },
        { type: 'SIGNIN_USER_REQUEST' },
      ),
    )
      .toEqual({
        data: [],
        errors: undefined,
        loading: false,
      });
  });

  it('should handle SIGNIN_USER_SUCCESS', () => {
    expect(
      signinReducer(
        { data: [], errors: undefined, loading: false },
        { data, type: 'SIGNIN_USER_SUCCESS' },
      ),
    )
      .toEqual({
        data: [],
        errors: undefined,
        loading: false,
      });
  });

  it('should handle SIGNIN_USER_ERROR', () => {
    expect(
      signinReducer(
        { data: [], errors: undefined, loading: false },
        { errors: {}, type: 'SIGNIN_USER_ERROR' },
      ),
    )
      .toEqual({
        data: [],
        errors: undefined,
        loading: false,
      });
  });
});
