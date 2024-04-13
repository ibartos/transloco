import { exclude } from "./exclude";
import { ValueEqualitySpecification } from "../../types";

export function arraySetEquals<T>(a: T[], b: T[], equalitySpecification?: ValueEqualitySpecification<T>): boolean;
export function arraySetEquals<T>(equalitySpecification?: ValueEqualitySpecification<T>): (a: T[], b: T[]) => boolean;
export function arraySetEquals<T>(
    firstArrayOrEqualitySpecification?: T[] | ValueEqualitySpecification<T>,
    secondArray?: T[],
    equalitySpecification?: ValueEqualitySpecification<T>
): boolean | ((a: T[], b: T[]) => boolean) {
    if (!Array.isArray(firstArrayOrEqualitySpecification)) {
        return (first: T[], second: T[]) => arraySetEquals<T>(first, second, firstArrayOrEqualitySpecification);
    }

    if (!secondArray) {
        throw new Error("No argument provided for parameter `b`");
    }

    const firstArray = firstArrayOrEqualitySpecification;

    return (
        firstArray.length === secondArray.length &&
        exclude(firstArray, secondArray, equalitySpecification).length === 0 &&
        exclude(secondArray, firstArray, equalitySpecification).length === 0
    );
}
