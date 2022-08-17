/*eslint-disable*/
import {
 ApolloClient, InMemoryCache, HttpLink, ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { clearAuthStorage, getAuthStorage } from 'services/storage';
// import { recoverSession, deleteSession } from '../utils/session';
/*
setAuthStorage
getAuthStorage
clearAuthStorage
*/
// https://localhost:8282/graphql

/* Configuration imported from '.env' file */
const backendProtocol = process.env.REACT_APP_PROTOCOL ?? 'http';
const backendHost = process.env.REACT_APP_HOST ?? 'localhost';
const backendPort = process.env.REACT_APP_PORT ?? '8282';
const backendGraphql = process.env.REACT_APP_GRAPHQL ?? 'graphql';

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}/${backendGraphql}`;

const httpLink = new HttpLink({
  uri: backendAddress,
});

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  const token = getAuthStorage();
  const authorization = token ? `Bearer ${token}` : '';
  operation.setContext(({ headers = {} }: any) => ({
    headers: {
      ...headers,
      authorization,
    },
  }));

  return forward(operation);
});

const errorLink = onError(({
 operation, graphQLErrors, networkError, response,
}: any) => {

  console.log('networkError', networkError)

  if (graphQLErrors) {
    graphQLErrors?.forEach((err: any) => {

      console.log('graphQLErrors', err)

      window.alert(err?.message);

      if (err?.extensions?.exception?.status === 401) {
        clearAuthStorage();
        window.location.href = '/signin';
      }

      // err.message, err.locations, err.path, err.extensions
      if (err.extensions.code === 'UNAUTHENTICATED' || err.extensions.code === 'FORBIDDEN') {
        clearAuthStorage();
        window.location.href = '/';
      }

      if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
        err.message = 'An error has occurred';
      }
    });
  }

  if (networkError?.response === 'invalid_token') {
    clearAuthStorage();
    window.location.href = '/';
  }
});

const link = ApolloLink.from([
  authMiddleware,
  errorLink,
  httpLink,
]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default apolloClient;