// import { ApolloClient, InMemoryCache, HttpLink, from, } from '@apollo/client';
// import { onError } from "@apollo/client/link/error";
import { ApolloProvider } from '@apollo/client/react';
import * as Sentry from '@sentry/react';
import ErrorPage from "containers/Error/Error";
import CustomRouter from 'routes/CustomRouter';
import Routes from './routes';
import "./i18n";
import apolloClient from './apollo/config';

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
  return <Sentry.ErrorBoundary fallback={ErrorPage} showDialog>
    <ApolloProvider client={apolloClient}>
      <CustomRouter history={history}>
        <Routes />
      </CustomRouter>
    </ApolloProvider>
  </Sentry.ErrorBoundary>;
}

export default Sentry.withProfiler(App);
