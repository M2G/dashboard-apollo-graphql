/*eslint-disable*/
import {
 ApolloClient, InMemoryCache, HttpLink, ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toast } from "react-toastify";
import { clearAuthStorage, getAuthStorage, clearUserStorage } from 'services/storage';
import ROUTER_PATH from 'constants/RouterPath';

// https://localhost:8282/graphql
/* Configuration imported from '.env' file */
const backendProtocol = process.env.REACT_APP_PROTOCOL ?? 'http';
const backendHost = process.env.REACT_APP_HOST ?? 'localhost';
const backendPort = process.env.REACT_APP_PORT ?? '8181';
const backendGraphql = process.env.REACT_APP_GRAPHQL ?? 'graphql';

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}/${backendGraphql}`;

console.log('backendAddress', backendAddress)

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
 operation, graphQLErrors, networkError, response, ...arg
}: any) => {

  console.log('ERROR', {
    operation, graphQLErrors, networkError, response, arg
  })

  console.log('------------------>', networkError?.response?.status)

  if (graphQLErrors) {
    graphQLErrors?.forEach((err: any) => {

      toast.error(err?.message);

      console.log('graphQLErrors', err)

      if (err?.extensions?.exception?.status === 401) {
        clearAuthStorage();
        clearUserStorage();
        window.location.href = ROUTER_PATH.SIGNIN;
      }

      // err.message, err.locations, err.path, err.extensions
      if (err.extensions.code === 'UNAUTHENTICATED'
        || err.extensions.code === 'FORBIDDEN') {
        clearAuthStorage();
        clearUserStorage();
        window.location.href = ROUTER_PATH.SIGNIN;
      }
    });
  }

  if (networkError?.response === 'invalid_token') {
    clearAuthStorage();
    clearUserStorage();
    window.location.href = ROUTER_PATH.SIGNIN;
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
