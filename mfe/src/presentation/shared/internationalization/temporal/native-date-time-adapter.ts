import { Injectable } from "@angular/core";

import { AdaptedDateTime, DateComponents, EpochComponent, TimeComponents } from "./adapted-date-time.model";
import { DateTimeAdapter } from "./date-time-adapter.model";
import { error } from "../../utils";

@Injectable({ providedIn: "root" })
export class NativeDateTimeAdapter implements DateTimeAdapter<Date> {
    public supports(date: unknown): date is Date {
        return date instanceof Date;
    }

    public convert<OtherDateTimeType>(
        otherDateTime: OtherDateTimeType | AdaptedDateTime<OtherDateTimeType>,
        otherDateTimeAdapter?: DateTimeAdapter<OtherDateTimeType>
    ): Date {
        const source =
            otherDateTime instanceof AdaptedDateTime
                ? otherDateTime
                : otherDateTimeAdapter !== undefined
                  ? otherDateTimeAdapter.adapt(otherDateTime)
                  : error("DateTimeAdapter is required!");

        if (!source.isValid()) {
            return new Date(NaN);
        }

        if (source.has("epoch")) {
            return new Date(source.epochTime());
        }

        const hasDate = source.has("date");
        const hasTime = source.has("time");

        if (!hasDate && !hasTime) {
            throw new Error("Unable to convert value to a Date instance");
        }

        const dateComponents = hasDate
            ? ([source.year(), source.month() - 1, source.day()] as const)
            : ([0, 0, 1] as const);

        const timeComponents = hasTime
            ? ([source.hour(), source.minute(), source.second(), source.millisecond()] as const)
            : // Use midday UTC (11:59:59.999) when source doesn't have a time component to minimize timezone offset issues.
              ([11, 59, 59, 999] as const);

        const dateTimeComponents = [...dateComponents, ...timeComponents] as const;

        const useUtc = !hasDate || !hasTime;

        return useUtc ? new Date(Date.UTC(...dateTimeComponents)) : new Date(...dateTimeComponents);
    }

    public adapt(date: Date): AdaptedDateTime<Date> {
        return new AdaptedNativeDate(date);
    }
}

class AdaptedNativeDate extends AdaptedDateTime<Date> {
    constructor(private readonly date: Date) {
        super();
    }

    public has(componentType: "date"): this is Exclude<this, keyof DateComponents> & DateComponents;
    public has(componentType: "time"): this is Exclude<this, keyof TimeComponents> & TimeComponents;
    public has(componentType: "epoch"): this is Exclude<this, keyof EpochComponent> & EpochComponent;
    public has(componentType: string): boolean {
        return componentType === "date" || componentType === "time" || componentType === "epoch";
    }

    public get(): Date {
        return this.date;
    }

    public isValid(): boolean {
        return !isNaN(this.date.getTime());
    }

    public year(): number {
        return this.date.getFullYear();
    }

    public month(): number {
        return this.date.getMonth() + 1;
    }

    public day(): number {
        return this.date.getDate();
    }

    public hour(): number {
        return this.date.getHours();
    }

    public minute(): number {
        return this.date.getMinutes();
    }

    public second(): number {
        return this.date.getSeconds();
    }

    public millisecond(): number {
        return this.date.getMilliseconds();
    }

    public epochTime(): number {
        return this.date.getTime();
    }
}
