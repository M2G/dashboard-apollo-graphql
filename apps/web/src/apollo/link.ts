import { ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import ROUTER_PATH from '@/constants/RouterPath';
import {
  clearAuthStorage,
  clearUserStorage,
  getAuthStorage,
} from '@/services/storage';

const operationName = 'GetConcerts';

const ERRORS = {
  FORBIDDEN: 'FORBIDDEN',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
};

// https://localhost:8282/graphql
/* Configuration imported from '.env' file */
const backendProtocol = (import.meta as any).env.REACT_APP_PROTOCOL ?? 'http';
const backendHost = (import.meta as any).env.REACT_APP_HOST ?? 'localhost';
const backendPort = (import.meta as any).env.REACT_APP_PORT ?? '8181';
const backendGraphql = (import.meta as any).env.REACT_APP_GRAPHQL ?? 'graphql';

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}/${backendGraphql}`;

console.log('backendAddress backendAddress', backendAddress);

// https://github.com/apollographql/apollo-client/issues/84#issuecomment-763833895
const httpLink = new HttpLink({
  uri: backendAddress,
});
const httpLink2 = new HttpLink({
  uri: 'http://localhost:8282/graphql',
});

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  console.log('operation operation operation operation', operation);

  const token = getAuthStorage();
  const authorization = token ? `Bearer ${token}` : '';
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization,
    },
  }));

  return forward(operation);
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response, ...arg }) => {
    if (
      networkError?.response === 'invalid_token' ||
      networkError?.response?.status === 401
    ) {
      clearAuthStorage();
      clearUserStorage();
      window.location.href = ROUTER_PATH.SIGNIN;
    }

    if (graphQLErrors?.length) {
      graphQLErrors.forEach(
        (err: {
          extensions: { exception: { status: number }; code: string };
          message: string | null | undefined;
        }) => {
          toast.error(err?.message);

          console.log('graphQLErrors', err);

          if (err?.extensions?.exception?.status === 401) {
            clearAuthStorage();
            clearUserStorage();
            window.location.href = ROUTER_PATH.SIGNIN;
          }

          // err.message, err.locations, err.path, err.extensions
          if (
            err.extensions.code === ERRORS.UNAUTHENTICATED ||
            err.extensions.code === ERRORS.FORBIDDEN
          ) {
            clearAuthStorage();
            clearUserStorage();
            window.location.href = ROUTER_PATH.SIGNIN;
          }
        },
      );
    }
  },
);

const graphqlEndpoints = ApolloLink.split(
  (operation) => operation.operationName === operationName,
  httpLink2,
  httpLink,
);

const link = ApolloLink.from([authMiddleware, errorLink, graphqlEndpoints]);

export default link;
