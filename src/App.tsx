import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { logError } from "sentry/logError";
import ErrorPage from "containers/Error/Error";
import { ErrorBoundary } from "react-error-boundary";
import CustomRouter from 'routes/CustomRouter';
import Routes from './routes';
import "./i18n";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8282/graphql",
});

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
