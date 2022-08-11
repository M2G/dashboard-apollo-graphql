/*eslint-disable*/
import type { Scope } from "@sentry/react";
import { withScope, captureException } from "@sentry/react";
import NotFoundException from "exceptions/NotFoundException";

declare enum Severity {
  Error = "error",
}

export const logError = (error: Error): void => {
  if (!(error instanceof NotFoundException)) {
    withScope((scope: Scope) => {
      scope.setLevel(Severity.Error);
      captureException(error);
    });
  }
};
