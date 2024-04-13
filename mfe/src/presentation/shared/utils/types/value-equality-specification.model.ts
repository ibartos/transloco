import { hasProperty } from "../collections/object";

export type ValueEqualitySpecification<T> = IdentitySelector<T> | { equals: ValueEqualityComparator<T> };
export type IdentitySelector<T> = (value: T) => unknown;
export type ValueEqualityComparator<T> = (firstValue: T, secondValue: T) => boolean;

export function isValueEqualitySpecification<T = unknown>(value: unknown): value is ValueEqualitySpecification<T> {
    return (
        typeof value === "function" ||
        (typeof value === "object" &&
            value !== null &&
            hasProperty(value, "equals") &&
            typeof value.equals === "function")
    );
}
