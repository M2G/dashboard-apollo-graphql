import {
  clearRefreshTokenStorage,
  clearAccessTokenStorage,
  clearUserStorage,
  setAccessTokenStorage,
  getAccessTokenStorage,
} from '@/services/storage';
import getAccessTokenPromise from '@/utils/getAccessToken';
import { ApolloLink, HttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import ROUTER_PATH from '@/constants/RouterPath';

const operationName = 'GetConcerts';

// https://localhost:8282/graphql
/* Configuration imported from '.env' file */
const backendProtocol = (import.meta as any).env.REACT_APP_PROTOCOL ?? 'http';
const backendHost = (import.meta as any).env.REACT_APP_HOST ?? 'localhost';
const backendPort = (import.meta as any).env.REACT_APP_PORT ?? '8181';
const backendGraphql = (import.meta as any).env.REACT_APP_GRAPHQL ?? 'graphql';

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}/${backendGraphql}`;

// https://github.com/apollographql/apollo-client/issues/84#issuecomment-763833895
const httpLink = new HttpLink({
  uri: backendAddress,
});
const httpLink2 = new HttpLink({
  credentials: 'same-origin',
  uri: 'http://localhost:8282/graphql',
});

const linkTokenHeader = setContext((operation, { headers }) => {
  console.log('---------------------------', operation.operationName);
  const token = getAccessTokenStorage();
  const authorization = token ? `Bearer ${token}` : '';
  return {
    headers: {
      ...headers,
      authorization,
    },
  };
});

export const possibleRefreshTokenErrors: string[] = [
  'Refresh token is not in database!', // refresh token is not in the database
  'Refresh token was expired. Please make a new signin request', // refresh token is expired
];

export const possibleAccessTokenErrors = [
  'Login required.', // access token is not sent or Header key is not correct
  'Error decoding signature', // access token or prefix is invalid
  'Signature has expired', // access token is expired
];

async function errorHandler({
  graphQLErrors,
  networkError,
  operation,
}: ErrorResponse): void {
  console.log('operation', operation);
  if (graphQLErrors) {
    graphQLErrors.forEach(function ({ err, message }): Promise<void> {
      console.log('graphQLErrors', message);
      console.log('err err err err', err?.extensions?.code);
      // response.errors = undefined
    });
  }
  if (networkError?.response?.status === 401) {
    // clearRefreshTokenStorage();
    // clearAccessTokenStorage();
    // clearUserStorage();
    // window.location.href = ROUTER_PATH.SIGNIN;
    const accessToken = await getAccessTokenPromise();
    console.log(
      'getAccessTokenPromise getAccessTokenPromise getAccessTokenPromise',
      accessToken,
    );
    setAccessTokenStorage(accessToken as string);
  }

  if (possibleRefreshTokenErrors.includes(message)) {
    clearRefreshTokenStorage();
    clearAccessTokenStorage();
    clearUserStorage();
    window.location.href = ROUTER_PATH.SIGNIN;
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
}

export const linkError = onError(errorHandler);

const graphqlEndpoints = ApolloLink.split(
  (operation) => operation.operationName === operationName,
  httpLink2,
  httpLink,
);

const link = ApolloLink.from([linkTokenHeader, linkError, graphqlEndpoints]);

export default link;
