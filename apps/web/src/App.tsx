import type { JSX } from 'react';

import ErrorFallback from '@/containers/Error/Error';
import { logError } from '@/sentry/logError';
import { ApolloProvider } from '@apollo/client/react';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LanguageProvider } from '@/LanguageProvider';
import 'react-toastify/dist/ReactToastify.css';

import apolloClient from './apollo/config';
import AuthContext from './AuthContext';
import Routes from './routes';
import './i18n';

function App(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <ApolloProvider client={apolloClient}>
        <AuthContext.Provider>
          <BrowserRouter>
            <LanguageProvider>
              <Routes />
            </LanguageProvider>
            <ToastContainer />
          </BrowserRouter>
        </AuthContext.Provider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default Sentry.withProfiler(App);
