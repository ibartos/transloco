export type ScalarOrArray<T> = T | T[];

export function coerceToArray<T>(value: ScalarOrArray<T>): T[] {
  return Array.isArray(value) ? value : [value];
}
