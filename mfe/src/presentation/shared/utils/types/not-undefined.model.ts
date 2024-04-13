/** Exludes the `undefined` type from type union `T`. */
export type NotUndefined<T> = Exclude<T, undefined>;
