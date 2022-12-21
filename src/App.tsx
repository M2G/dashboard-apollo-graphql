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
import Dog from './containers/UserList/Dog';
import Test from './containers/UserList/Test';


function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <ApolloProvider client={apolloClient}>
        <AuthContext.Provider>
          <BrowserRouter>
            <Routes />
              <Test name="Buck" />
              <Dog></Dog>
            <ToastContainer />
          </BrowserRouter>
        </AuthContext.Provider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default Sentry.withProfiler(App);
