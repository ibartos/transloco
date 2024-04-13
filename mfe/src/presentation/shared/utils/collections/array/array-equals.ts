import { ValueEqualitySpecification } from '../../types/value-equality-specification.model';

export function arrayEquals<T>(firstArray: T[], secondArray: T[], equalitySpecification?: ValueEqualitySpecification<T>): boolean {
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  if (!equalitySpecification) {
    return firstArray.every((value, index) => value === secondArray[index]);
  }

  if ('equals' in equalitySpecification) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return firstArray.every((value, index) => equalitySpecification.equals(value, secondArray[index]!));
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return firstArray.every((value, index) => equalitySpecification(value) === equalitySpecification(secondArray[index]!));
}
