// import { ApolloClient, InMemoryCache, HttpLink, from, } from '@apollo/client';
// import { onError } from "@apollo/client/link/error";
import { ApolloProvider } from '@apollo/client/react';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import { logError } from "sentry/logError";
import { BrowserRouter } from "react-router-dom";
// import CustomRouter from 'routes/CustomRouter';
import ErrorFallback from 'containers/Error/Error';
import AuthContext from './AuthContext';
import Routes from './routes';
import apolloClient from './apollo/config';
import "react-toastify/dist/ReactToastify.css";
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

function App() {
  return <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <ApolloProvider client={apolloClient}>
      <AuthContext.Provider>
        <BrowserRouter>
          <Routes />
          <ToastContainer />
        </BrowserRouter>
      </AuthContext.Provider>
    </ApolloProvider>
  </ErrorBoundary>;
}

export default Sentry.withProfiler(App);
