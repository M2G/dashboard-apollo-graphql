import type { JSX } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { logError } from 'sentry/logError';
import { BrowserRouter } from 'react-router-dom';
import ErrorFallback from 'containers/Error/Error';
import AuthContext from './AuthContext';
import Routes from './routes';
import apolloClient from './apollo/config';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';

function App(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <ApolloProvider client={apolloClient}>
        <AuthContext.Provider>
          <BrowserRouter>
            <Routes />
            <ToastContainer />
          </BrowserRouter>
        </AuthContext.Provider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default Sentry.withProfiler(App);
