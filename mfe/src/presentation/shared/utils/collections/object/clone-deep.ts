function publicCloneDeep<T>(value: T): T {
    return cloneDeep(value, new Map());
}

function cloneDeep<T>(value: T, clonedValues: Map<unknown, unknown>): T {
    if (value === null || typeof value !== "object") {
        return value;
    }

    if (clonedValues.has(value)) {
        return clonedValues.get(value) as T;
    }

    if (Array.isArray(value)) {
        const clonedArray = new Array<unknown>(value.length);

        clonedValues.set(value, clonedArray);

        for (const [index, element] of value.entries()) {
            clonedArray[index] = cloneDeep(element, clonedValues);
        }

        return clonedArray as unknown as T;
    }

    if (typeof value === "object") {
        const clonedObject: Record<string, unknown> = {};

        clonedValues.set(value, clonedObject);

        for (const [propertyKey, propertyValue] of Object.entries(value)) {
            clonedObject[propertyKey] = cloneDeep(propertyValue, clonedValues);
        }

        return clonedObject as unknown as T;
    }

    throw new Error(`Unable to clone value ${String(value)} (${typeof value})`);
}

export { publicCloneDeep as cloneDeep };
