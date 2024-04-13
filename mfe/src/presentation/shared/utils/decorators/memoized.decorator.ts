// Source: https://gist.github.com/dscheerens/8791470290d2a051934fb45890b23601

/* eslint-disable @typescript-eslint/ban-types */

const GLOBAL_MEMOIZATION_MAP = new WeakMap<object, Map<string, unknown>>();

/**
 * Decorator that can only be applied to a get method and which applies memoization to this method.
 * This ensures that the result of the first call to the get method is being stored and any subsequent caller(s)
 * will receive this stored result without reevaluating the get method.
 * Can be applied to get methods that return Observable or scalar results.
 *
 * @example
 * ```@Memoized public get myProperty$(): Observable<number> {
 *   return interval(5000);
 * } ```
 *
 * **Important: In the above example only the reference to the Observable is stored, not the last value emitted by the Observable.**
 *
 */
export function Memoized<T extends { constructor: Function }>(
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    if (!descriptor.get) {
        throw new Error(
            `Cannot apply @Memoized decorator to '${target.constructor.name}.${propertyKey}' since it has no get accessor`
        );
    }

    return {
        ...descriptor,
        get(this: object): unknown {
            let localMemoizationMap = GLOBAL_MEMOIZATION_MAP.get(this);
            if (!localMemoizationMap) {
                localMemoizationMap = new Map<string, unknown>();
                GLOBAL_MEMOIZATION_MAP.set(this, localMemoizationMap);
            }

            if (localMemoizationMap.has(propertyKey)) {
                return localMemoizationMap.get(propertyKey);
            }

            const value: unknown = descriptor.get?.call(this);

            localMemoizationMap.set(propertyKey, value);

            return value;
        },
    };
}
