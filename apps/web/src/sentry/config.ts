const SENTRY_CONFIG = {
  dsn: 'https://1642007bbfdd43958f06839a79a28d99@o1247964.ingest.sentry.io/6407934',
  enabled: (import.meta as any).env.MODE !== 'development',
  environment: (import.meta as any).env.MODE,
  tracesSampleRate: 0,
};

export default SENTRY_CONFIG;
