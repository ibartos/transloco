export function error(errorOrMessage: string | Error): never {
  throw typeof errorOrMessage === 'string' ? new Error(errorOrMessage) : errorOrMessage;
}
