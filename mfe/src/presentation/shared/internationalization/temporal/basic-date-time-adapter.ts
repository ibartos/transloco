import { Injectable } from "@angular/core";

import { AdaptedDateTime } from "./adapted-date-time.model";
import { DateTimeAdapter } from "./date-time-adapter.model";
import { BasicDateTime, error, isBasicDateTime, isValidBasicDateTime } from "../../utils";

@Injectable({ providedIn: "root" })
export class BasicDateTimeAdapter implements DateTimeAdapter<BasicDateTime> {
    public supports(dateTime: unknown): dateTime is BasicDateTime {
        return isBasicDateTime(dateTime);
    }

    public convert<OtherDateTimeType>(
        otherDateTime: OtherDateTimeType,
        otherDateTimeAdapter?: DateTimeAdapter<OtherDateTimeType>
    ): BasicDateTime {
        const source =
            otherDateTime instanceof AdaptedDateTime
                ? otherDateTime
                : otherDateTimeAdapter !== undefined
                  ? otherDateTimeAdapter.adapt(otherDateTime)
                  : error("DateTimeAdapter is required!");

        if (!source.isValid()) {
            return {
                year: NaN,
                month: NaN,
                day: NaN,
                hour: NaN,
                minute: NaN,
                second: NaN,
                millisecond: NaN,
            };
        }

        const hasDate = source.has("date");
        const hasTime = source.has("time");

        if (!hasDate && !hasTime) {
            throw new Error("Unable to convert value to a BasicDateTime instance");
        }

        const dateComponents = hasDate
            ? { year: source.year(), month: source.month(), day: source.day() }
            : { year: 0, month: 1, day: 1 };

        const timeComponents = hasTime
            ? {
                  hour: source.hour(),
                  minute: source.minute(),
                  second: source.second(),
                  millisecond: source.millisecond(),
              }
            : // Use midday UTC (11:59:59.999) when source doesn't have a time component to minimize timezone offset issues.
              { hour: 11, minute: 59, second: 59, millisecond: 999 };

        return { ...dateComponents, ...timeComponents };
    }

    public adapt(dateTime: BasicDateTime): AdaptedDateTime<BasicDateTime> {
        return new AdaptedBasicDateTime(dateTime);
    }
}

class AdaptedBasicDateTime extends AdaptedDateTime<BasicDateTime> {
    public readonly epochTime: undefined;

    constructor(private readonly dateTime: BasicDateTime) {
        super();
    }

    public has(dateTimeComponent: string): boolean {
        return dateTimeComponent === "date" || dateTimeComponent === "time";
    }

    public get(): BasicDateTime {
        return this.dateTime;
    }

    public isValid(): boolean {
        return isValidBasicDateTime(this.dateTime);
    }

    public year(): number {
        return this.dateTime.year;
    }

    public month(): number {
        return this.dateTime.month;
    }

    public day(): number {
        return this.dateTime.day;
    }

    public hour(): number {
        return this.dateTime.hour;
    }

    public minute(): number {
        return this.dateTime.minute;
    }

    public second(): number {
        return this.dateTime.second;
    }

    public millisecond(): number {
        return this.dateTime.millisecond;
    }
}
