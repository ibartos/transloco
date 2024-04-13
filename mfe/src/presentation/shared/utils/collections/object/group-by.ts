export function groupBy<K, V>(values: Iterable<V>, keySelector: (value: V) => K): Map<K, V[]> {
    const groupedValues = new Map<K, V[]>();

    for (const value of values) {
        const key = keySelector(value);

        const groupValues = groupedValues.get(key);

        if (groupValues) {
            groupValues.push(value);
        } else {
            groupedValues.set(key, [value]);
        }
    }

    return groupedValues;
}
