import { Injectable } from "@angular/core";

import { AdaptedDateTime } from "./adapted-date-time.model";
import { DateTimeAdapter } from "./date-time-adapter.model";
import { BasicDate, error, isBasicDate, isValidBasicDate } from "../../utils";

@Injectable({ providedIn: "root" })
export class BasicDateAdapter implements DateTimeAdapter<BasicDate> {
    public supports(dateTime: unknown): dateTime is BasicDate {
        return isBasicDate(dateTime);
    }

    public convert<OtherDateTimeType>(
        otherDateTime: OtherDateTimeType,
        otherDateTimeAdapter?: DateTimeAdapter<OtherDateTimeType>
    ): BasicDate {
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
            };
        }

        if (!source.has("date")) {
            throw new Error("Unable to convert value to a BasicDate instance");
        }

        return {
            year: source.year(),
            month: source.month(),
            day: source.day(),
        };
    }

    public adapt(date: BasicDate): AdaptedDateTime<BasicDate> {
        return new AdaptedBasicDate(date);
    }
}

class AdaptedBasicDate extends AdaptedDateTime<BasicDate> {
    public readonly hour: undefined;
    public readonly minute: undefined;
    public readonly second: undefined;
    public readonly millisecond: undefined;
    public readonly epochTime: undefined;

    constructor(private readonly date: BasicDate) {
        super();
    }

    public has(dateTimeComponent: string): boolean {
        return dateTimeComponent === "date";
    }

    public get(): BasicDate {
        return this.date;
    }

    public isValid(): boolean {
        return isValidBasicDate(this.date);
    }

    public year(): number {
        return this.date.year;
    }

    public month(): number {
        return this.date.month;
    }

    public day(): number {
        return this.date.day;
    }
}
