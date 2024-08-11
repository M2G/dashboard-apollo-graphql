import { jwtDecode, JwtPayload } from 'jwt-decode';
import apolloClient from '@/apollo/config';
import { RefreshTokenDocument } from '@/modules/graphql/generated';
import {
  getAccessTokenStorage,
  getRefreshTokenStorage,
  setRefreshTokenStorage,
} from '@/services/storage';

async function getRefreshedAccessTokenPromise() {
  console.log('getRefreshedAccessTokenPromise');

  try {
    const refreshToken = getRefreshTokenStorage();

    console.log('refreshToken refreshToken', refreshToken);

    const { data } = await apolloClient.mutate({
      mutation: RefreshTokenDocument,
      variables: { token: refreshToken },
    });

    console.log('RefreshTokenDocument RefreshTokenDocument', data);

    if (data.refreshToken?.refreshToken) {
      setRefreshTokenStorage(data.refreshToken.refreshToken);
    }
    return data.refreshToken?.accessToken;
  } catch (error) {
    // authTokenActions.logOut();
    console.log('error error error error error error');
    return error;
  }
}

let pendingAccessTokenPromise: Promise<unknown> | null = null;

async function getAccessTokenPromise(): Promise<unknown> {
  const token = getAccessTokenStorage();
  const currentNumericDate = Math.round(Date.now() / 1000);

  const decodedToken: JwtPayload | null = token && jwtDecode(token);

  console.log('decodedToken.exp', decodedToken.exp);
  console.log('currentNumericDate', currentNumericDate);
  console.log(
    'currentNumericDate + 1 * 60 <= decodedToken.exp',
    currentNumericDate <= decodedToken.exp,
  );

  if (currentNumericDate <= decodedToken.exp) {
    return new Promise((resolve) => {
      console.log('GOOOOOOOOO');
      resolve(token);
    });
  }

  console.log('NOT GOOOOOOOOO');

  if (!pendingAccessTokenPromise) {
    pendingAccessTokenPromise = getRefreshedAccessTokenPromise().finally(() => {
      pendingAccessTokenPromise = null;
    });
  }

  return pendingAccessTokenPromise;
}

export default getAccessTokenPromise;
