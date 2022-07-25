/*eslint-disable*/
import { withScope, captureException, Severity } from "@sentry/react";
import NotFoundException from "exceptions/NotFoundException";

export const logError = (error: Error): void => {
  if (!(error instanceof NotFoundException)) {
    withScope((scope) => {
      scope.setLevel(Severity.Error);
      captureException(error);
    });
  }
};
