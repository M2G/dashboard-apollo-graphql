// import { ApolloClient, InMemoryCache, HttpLink, from, } from '@apollo/client';
// import { onError } from "@apollo/client/link/error";
import { ApolloProvider } from '@apollo/client/react';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "containers/Error/Error";
import { logError } from "sentry/logError";
import CustomRouter from 'routes/CustomRouter';
import AuthContext from './AuthContext';
import Routes from './routes';
import apolloClient from './apollo/config';
import "./i18n";

/*
const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }

  if (networkError) {
    // handle network error
    console.log(networkError);
  }
});

const httpLink = new HttpLink({ uri: 'https://localhost:8282/graphql' });

const appLink = from([
  errorLink, httpLink,
]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: appLink,
});
 */

function App({ history }: any) {
  return <ErrorBoundary FallbackComponent={ErrorPage} onError={logError}>
    <ApolloProvider client={apolloClient}>
      <AuthContext.Provider>
        <CustomRouter history={history}>
          <Routes />
        </CustomRouter>
      </AuthContext.Provider>
    </ApolloProvider>
  </ErrorBoundary>;
}

export default Sentry.withProfiler(App);
