import { IdentitySelector, ValueEqualityComparator, ValueEqualitySpecification } from '../../types/value-equality-specification.model';

export function exclude<T>(source: T[], valuesToExclude: T[], equalitySpecification?: ValueEqualitySpecification<T>): T[] {
  if (equalitySpecification === undefined) {
    return excludeByValue(source, valuesToExclude);
  }

  if ('equals' in equalitySpecification) {
    return excludeByValueEqualityComparator(source, valuesToExclude, equalitySpecification.equals);
  }

  return excludeByIdentitySelector(source, valuesToExclude, equalitySpecification);
}

function excludeByValue<T>(source: T[], valuesToExclude: T[]): T[] {
  const exclusionSet = new Set(valuesToExclude);

  return source.filter((value) => !exclusionSet.has(value));
}

function excludeByIdentitySelector<T>(source: T[], valuesToExclude: T[], identititySelector: IdentitySelector<T>): T[] {
  const exclusionSet = new Set(valuesToExclude.map(identititySelector));

  return source.filter((value) => !exclusionSet.has(identititySelector(value)));
}

function excludeByValueEqualityComparator<T>(source: T[], valuesToExclude: T[], equals: ValueEqualityComparator<T>): T[] {
  return source.filter((firstValue) => valuesToExclude.every((secondValue) => !equals(firstValue, secondValue)));
}
