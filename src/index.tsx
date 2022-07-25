/* eslint-disable */
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { init as initSentry } from "@sentry/react";
import { SENTRY_CONFIG } from "sentry/config";
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import App from './App';
import './index.scss';

initSentry(SENTRY_CONFIG);

export const history = createBrowserHistory();
export const store = configureStore({} as any);

function render(Component: any){
  const MOUNT_NODE: any = document.getElementById('root') || document.createElement('div');
    const root = createRoot(MOUNT_NODE);
  if (root) {
      return root.render(
          <Provider store={store}>
            <Component history={history} />
          </Provider>
    );
  }
}

render(App);


