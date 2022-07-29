/* eslint-disable */
import { createRoot } from 'react-dom/client';
import { init as initSentry } from "@sentry/react";
import { SENTRY_CONFIG } from "sentry/config";
import { createBrowserHistory } from 'history';
import App from './App';
import './index.scss';

initSentry(SENTRY_CONFIG);

export const history = createBrowserHistory();

function render(Component: any){
  const MOUNT_NODE: any = document.getElementById('root') || document.createElement('div');
    const root = createRoot(MOUNT_NODE);
  if (root) {
      return root.render(<Component history={history} />);
  }
}

render(App);


