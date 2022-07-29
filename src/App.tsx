import {
 ApolloClient, ApolloLink, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { logError } from "sentry/logError";
import ErrorPage from "containers/Error/Error";
import { ErrorBoundary } from "react-error-boundary";
import CustomRouter from 'routes/CustomRouter';
import Routes from './routes';
import "./i18n";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:8282/graphql",
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([httpLink]),
});

/*
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8282/graphql",
});
*/
function App({ history }: any) {
  return <ErrorBoundary FallbackComponent={ErrorPage} onError={logError}>
    <ApolloProvider client={client}>
    <CustomRouter history={history}>
      <Routes />
    </CustomRouter>
    </ApolloProvider>
  </ErrorBoundary>;
}

export default App;
