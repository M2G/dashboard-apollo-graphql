import { ApolloLink, HttpLink, Observable } from '@apollo/client';
import { graphql, print } from 'graphql/index';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import ROUTER_PATH from 'constants/RouterPath';
import {
  clearAuthStorage,
  clearUserStorage,
  getAuthStorage,
} from '../services/storage';
import { schema } from './schema';

// https://localhost:8282/graphql
/* Configuration imported from '.env' file */
const backendProtocol = process.env.REACT_APP_PROTOCOL ?? 'http';
const backendHost = process.env.REACT_APP_HOST ?? 'localhost';
const backendPort = process.env.REACT_APP_PORT ?? '8181';
const backendGraphql = process.env.REACT_APP_GRAPHQL ?? 'graphql';

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}/${backendGraphql}`;

console.log('backendAddress', backendAddress);

async function delay(wait: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

const httpLink = new HttpLink({
  uri: backendAddress,
});

const authMiddleware = new ApolloLink(
  (operation: any, forward: any) =>
    new Observable(async (observer) => {
      const token = getAuthStorage();
      const authorization = token ? `Bearer ${token}` : '';
      operation.setContext(({ headers = {} }: any) => ({
        headers: {
          ...headers,
          authorization,
        },
      }));

      const { query, operationName, variables } = operation;

      console.log('operation operation', operation);

      await delay(300);
      try {
        const result = await graphql({
          operationName,
          schema,
          source: print(query),
          variableValues: variables,
        });
        observer.next(result);
        observer.complete();
        return forward(operation);
      } catch (err) {
        observer.error(err);
      }
    }),
);

const errorLink = onError(
  ({
 operation, graphQLErrors, networkError, response, ...arg
}: any) => {
    console.log('ERROR', {
      arg,
      graphQLErrors,
      networkError,
      operation,
      response,
    });

    console.log('------------------>', networkError?.response?.status);

    if (graphQLErrors) {
      graphQLErrors?.forEach((err: any) => {
        toast.error(err?.message);

        console.log('graphQLErrors', err);

        if (err?.extensions?.exception?.status === 401) {
          clearAuthStorage();
          clearUserStorage();
          window.location.href = ROUTER_PATH.SIGNIN;
        }

        // err.message, err.locations, err.path, err.extensions
        if (
          err.extensions.code === 'UNAUTHENTICATED'
          || err.extensions.code === 'FORBIDDEN'
        ) {
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
  },
);

const link = ApolloLink.from([authMiddleware, errorLink, httpLink]);

export default link;
