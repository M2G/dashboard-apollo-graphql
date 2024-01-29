function ErrorFallback({
  componentStack,
  error,
  resetErrorBoundary,
}): JSX.Element {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button type="submit" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

export default ErrorFallback;
