import { signoutReducer } from './reducers';

describe('todos reducer', () => {
  it('should handle initial state', () => {
   expect(
     signoutReducer(undefined, { data: [], errors: {}, type: '' }),
     ).toEqual({ data: [], errors: undefined, loading: false});
  });

  it('should handle SIGNOUT_USER_REQUEST', () => {
    expect(
      signoutReducer(
        { data: [], errors: undefined, loading: false },
        { type: 'SIGNOUT_USER_REQUEST' },
      ),
    )
      .toEqual({
        data: [],
        errors: undefined,
        loading: false,
      });
  });
});
