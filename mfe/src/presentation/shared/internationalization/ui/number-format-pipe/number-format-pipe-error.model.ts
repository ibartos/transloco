export class AppNumberFormatPipeError extends Error {
  constructor(
    /** Name of the pipe that is reporting the error. */
    pipeName: string,

    /** Message describing what went wrong. */
    message: string,

    /** Origin of the error. This can be anything but usually is another `Error` instance. */
    public override readonly cause?: unknown,
  ) {
    super(formatErrorMessage(pipeName, message, cause));
  }
}

function formatErrorMessage(errorName: string, message: string, cause: unknown): string {
  const causeMessage =
    typeof cause === 'string'
      ? cause
      : cause instanceof Error && cause.message
        ? cause.message
        : cause !== undefined
          ? String(cause)
          : undefined;

  return `${errorName}: ${causeMessage !== undefined ? `${message}, cause: ${String(cause)}` : message}`;
}
