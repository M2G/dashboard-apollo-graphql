import type { Scope } from '@sentry/react';
import { captureException, withScope } from '@sentry/react';
import NotFoundException from '@/exceptions/NotFoundException';

declare enum Severity {
  Error = 'error',
}

export const logError = (error: Error): void => {
  //@TODO to fix

  if (!(error instanceof NotFoundException)) {
    withScope((scope: Scope) => {
      scope.setLevel(Severity.Error);
      captureException(error);
    });
  }
};
