import { logError } from "sentry/logError";
import ErrorPage from "containers/Error/Error";
import { ErrorBoundary } from "react-error-boundary";
import CustomRouter from 'routes/CustomRouter';
import Routes from './routes';
import "./i18n";

function App({ history }: any) {
  return <ErrorBoundary FallbackComponent={ErrorPage} onError={logError}>
    <CustomRouter history={history}>
      <Routes />
    </CustomRouter>
  </ErrorBoundary>;
}

export default App;
