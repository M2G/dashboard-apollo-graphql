import {
 ApolloClient, InMemoryCache,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import * as Sentry from '@sentry/react';
import ErrorPage from "containers/Error/Error";
import CustomRouter from 'routes/CustomRouter';
import Routes from './routes';
import "./i18n";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: "http://localhost:8282/graphql",
});

function App({ history }: any) {
  return <Sentry.ErrorBoundary fallback={ErrorPage} showDialog>
    <ApolloProvider client={client}>
      <CustomRouter history={history}>
        <Routes />
      </CustomRouter>
    </ApolloProvider>
  </Sentry.ErrorBoundary>;
}

export default Sentry.withProfiler(App);
