import { createRoot } from 'react-dom/client';
import { init as initSentry } from '@sentry/react';
import { SENTRY_CONFIG } from 'sentry/config';
import App from './App';
import './index.scss';

initSentry(SENTRY_CONFIG);

function render(Component: any): void {
  const MOUNT_NODE: any = document.getElementById('root') ?? document.createElement('div');
  const root = createRoot(MOUNT_NODE);
  if (root) root.render(<Component />);
}

render(App);
