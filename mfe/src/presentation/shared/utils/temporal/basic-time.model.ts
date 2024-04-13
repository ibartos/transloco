import { hasProperty } from "../collections/object";

import { HOURS_PER_DAY, MILLISECONDS_PER_SECOND, MINUTES_PER_HOUR, SECONDS_PER_MINUTE } from "./temporal-constants";

/** Interface to represent just the components of a time (hour, minute, second, millisecond). */
export interface BasicTime {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
}

export function isBasicTime(value: unknown): value is BasicTime {
    return (
        hasProperty(value, "hour") &&
        typeof value.hour === "number" &&
        hasProperty(value, "minute") &&
        typeof value.minute === "number" &&
        hasProperty(value, "second") &&
        typeof value.second === "number" &&
        hasProperty(value, "millisecond") &&
        typeof value.millisecond === "number"
    );
}

export function isValidBasicTime(time: BasicTime): boolean {
    return (
        0 <= time.hour &&
        time.hour < HOURS_PER_DAY &&
        0 <= time.minute &&
        time.minute < MINUTES_PER_HOUR &&
        0 <= time.second &&
        time.second < SECONDS_PER_MINUTE &&
        0 <= time.millisecond &&
        time.millisecond < MILLISECONDS_PER_SECOND
    );
}

export function isSameBasicTime(first: BasicTime, second: BasicTime): boolean {
    return (
        first === second ||
        (first.hour === second.hour &&
            first.minute === second.minute &&
            first.second === second.second &&
            first.millisecond === second.millisecond)
    );
}
