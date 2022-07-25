export const SENTRY_CONFIG = {
  dsn: "https://1642007bbfdd43958f06839a79a28d99@o1247964.ingest.sentry.io/6407934",
  enabled: process.env.REACT_APP_ENVIRONMENT !== "dev",
  environment: process.env.REACT_APP_ENVIRONMENT,
  tracesSampleRate: 0,
};
