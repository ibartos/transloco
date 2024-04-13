import { Injectable } from "@angular/core";

import { AdaptedDateTime } from "./adapted-date-time.model";
import { DateTimeAdapter } from "./date-time-adapter.model";
import { BasicTime, error, isBasicTime, isValidBasicTime } from "../../utils";

@Injectable({ providedIn: "root" })
export class BasicTimeAdapter implements DateTimeAdapter<BasicTime> {
    public supports(dateTime: unknown): dateTime is BasicTime {
        return isBasicTime(dateTime);
    }

    public convert<OtherDateTimeType>(
        otherDateTime: OtherDateTimeType,
        otherDateTimeAdapter?: DateTimeAdapter<OtherDateTimeType>
    ): BasicTime {
        const source =
            otherDateTime instanceof AdaptedDateTime
                ? otherDateTime
                : otherDateTimeAdapter !== undefined
                  ? otherDateTimeAdapter.adapt(otherDateTime)
                  : error("DateTimeAdapter is required!");

        if (!source.isValid()) {
            return {
                hour: NaN,
                minute: NaN,
                second: NaN,
                millisecond: NaN,
            };
        }

        if (!source.has("time")) {
            throw new Error("Unable to convert value to a BasicDate BasicTime");
        }

        return {
            hour: source.hour(),
            minute: source.minute(),
            second: source.second(),
            millisecond: source.millisecond(),
        };
    }

    public adapt(dateTime: BasicTime): AdaptedDateTime<BasicTime> {
        return new AdaptedBasicTime(dateTime);
    }
}

class AdaptedBasicTime extends AdaptedDateTime<BasicTime> {
    public readonly year: undefined;
    public readonly month: undefined;
    public readonly day: undefined;
    public readonly epochTime: undefined;

    constructor(private readonly dateTime: BasicTime) {
        super();
    }

    public has(dateTimeComponent: string): boolean {
        return dateTimeComponent === "time";
    }

    public get(): BasicTime {
        return this.dateTime;
    }

    public isValid(): boolean {
        return isValidBasicTime(this.dateTime);
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
