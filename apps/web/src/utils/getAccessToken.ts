import { jwtDecode } from 'jwt-decode';
import {
  getAccessTokenStorage,
  getRefreshTokenStorage,
} from '@/services/storage';
import apolloClient from '@/apollo/config';
import { RefreshTokenDocument } from '@/modules/graphql/generated';

export const possibleRefreshTokenErrors = [
  'Refresh token is required', // refresh token is not sent or Cookie is deleted
  'Invalid refresh token', // refresh token is not in the database
  'Refresh token is expired', // refresh token is expired
];

export const possibleAccessTokenErrors = [
  'Login required.', // access token is not sent or Header key is not correct
  'Error decoding signature', // access token or prefix is invalid
  'Signature has expired', // access token is expired
];

async function getRefreshedAccessTokenPromise() {
  console.log('getRefreshedAccessTokenPromise');

  try {
    // const [refreshToken, { error, data }] = useRefreshTokenMutation({});

    // refreshToken({ variables: { refreshToken: getRefreshTokenStorage() } });

    const { data } = await apolloClient.mutate({
      mutation: RefreshTokenDocument,
      variables: { token: getRefreshTokenStorage() },
    });

    console.log('RefreshTokenDocument RefreshTokenDocument', data);

    // if (data && data.refreshToken)
    //  authTokenActions.setAuthToken(data.refreshToken);
    // return data.refreshToken.token;

    // console.log('data data data', data);
  } catch (error) {
    // authTokenActions.logOut();
    console.log(error);
    return error;
  }
}

let pendingAccessTokenPromise = null;

export default function getAccessTokenPromise() {
  // localStorage.get token
  /*
  const authTokenState = reduxStoreMain.getState().authToken;
  const currentNumericDate = Math.round(Date.now() / 1000);

  if (
    authTokenState &&
    authTokenState.token &&
    authTokenState.payload &&
    currentNumericDate + 1 * 60 <= authTokenState.payload.exp
  ) {
    //if (currentNumericDate + 3 * 60 >= authTokenState.payload.exp) getRefreshedAccessTokenPromise()
    return new Promise((resolve) => resolve(authTokenState.token));
  }

  if (!pendingAccessTokenPromise)
    pendingAccessTokenPromise = getRefreshedAccessTokenPromise().finally(
      () => (pendingAccessTokenPromise = null),
    );

  return pendingAccessTokenPromise;
   */

  const token = getAccessTokenStorage();
  const currentNumericDate = Math.round(Date.now() / 1000);

  const decodedToken: {
    exp: number;
  } = (token && jwtDecode(token)) || {};

  if (currentNumericDate + 1 * 60 <= decodedToken.exp) {
    //if (currentNumericDate + 3 * 60 >= authTokenState.payload.exp) getRefreshedAccessTokenPromise()
    return new Promise((resolve) => resolve(token));

    console.log('GOOOOOOOOO');
  }

  console.log('NOT GOOOOOOOOO', pendingAccessTokenPromise);

  if (!pendingAccessTokenPromise) {
    pendingAccessTokenPromise = getRefreshedAccessTokenPromise().finally(
      () => (pendingAccessTokenPromise = null),
    );
  }

  return pendingAccessTokenPromise;
}
