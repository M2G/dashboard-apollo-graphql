import { FC } from 'react';
import { JSX } from 'react/jsx-runtime';
import { createRoot } from 'react-dom/client';
import { init as initSentry } from '@sentry/react';
import SENTRY_CONFIG from 'sentry/config';
import App from './App';
import './index.scss';

initSentry(SENTRY_CONFIG as any);

function render(
  Component: FC<Record<string, any>> | JSX.IntrinsicAttributes,
): void {
  console.log('import.meta.env ', import.meta.env);
  const MOUNT_NODE =
    document.getElementById('root') ?? document.createElement('div');
  const root = createRoot(MOUNT_NODE);
  if (root) root.render(<Component />);
}

render(App);
