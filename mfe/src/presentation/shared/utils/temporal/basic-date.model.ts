import { hasProperty } from "../collections/object/has-property";

import { daysInMonth } from "./calendar-utils";

/** Interface to represent just the components of a date (year, month, day). */
export interface BasicDate {
    year: number;
    month: number;
    day: number;
}

export function isBasicDate(value: unknown): value is BasicDate {
    return (
        hasProperty(value, "year") &&
        typeof value.year === "number" &&
        hasProperty(value, "month") &&
        typeof value.month === "number" &&
        hasProperty(value, "day") &&
        typeof value.day === "number"
    );
}

export function isValidBasicDate(date: BasicDate): boolean {
    return (
        [date.year, date.month, date.day].every(Number.isInteger) &&
        1 <= date.month &&
        date.month <= 12 &&
        1 <= date.day &&
        date.day <= daysInMonth(date)
    );
}

export function isSameBasicDate(first: BasicDate, second: BasicDate): boolean {
    return first === second || (first.year === second.year && first.month === second.month && first.day === second.day);
}
