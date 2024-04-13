export class AppBaseDateTimeFormatPipeError extends Error {
  constructor(
    /** Message describing what went wrong. */
    message: string,

    /** Origin of the error. This can be anything but usually is another `Error` instance. */
    public override readonly cause?: unknown,
  ) {
    super(formatErrorMessage(message, cause));
  }
}

function formatErrorMessage(message: string, cause: unknown): string {
  const causeMessage =
    typeof cause === 'string'
      ? cause
      : cause instanceof Error && cause.message
        ? cause.message
        : cause !== undefined
          ? String(cause)
          : undefined;

  return `AppBaseDateTimeFormatPipeError: ${causeMessage !== undefined ? `${message}, cause: ${String(cause)}` : message}`;
}
