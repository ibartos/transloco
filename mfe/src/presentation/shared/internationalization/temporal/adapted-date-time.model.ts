export abstract class AdaptedDateTime<DateTimeType> implements Partial<DateComponents>, Partial<TimeComponents>, Partial<EpochComponent> {
  public abstract has(componentType: 'date'): this is Exclude<this, keyof DateComponents> & DateComponents;
  public abstract has(componentType: 'time'): this is Exclude<this, keyof TimeComponents> & TimeComponents;
  public abstract has(componentType: 'epoch'): this is Exclude<this, keyof EpochComponent> & EpochComponent;
  public abstract get(): DateTimeType;
  public abstract isValid(): boolean;
  public abstract year?(): number;
  public abstract month?(): number;
  public abstract day?(): number;
  public abstract hour?(): number;
  public abstract minute?(): number;
  public abstract second?(): number;
  public abstract millisecond?(): number;
  public abstract epochTime?(): number;

  /**
   * Checks whether this `AdaptedDateTime` represents the exact same time as the other. In case at least one of them is not valid, then no
   * comparison can be made and they are considered to be non-equal, unless both reference the same object.
   */
  public equals(other: AdaptedDateTime<unknown>): boolean {
    return (
      this === other ||
      this.get() === other.get() ||
      (this.isValid() &&
        other.isValid() &&
        this.has('epoch') === other.has('epoch') &&
        this.has('date') === other.has('date') &&
        this.has('time') === other.has('time') &&
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        (!this.has('epoch') || this.epochTime() === other.epochTime!()) &&
        (!this.has('date') || (this.year() === other.year!() && this.month() === other.month!() && this.day() === other.day!())) &&
        (!this.has('time') ||
          (this.hour() === other.hour!() &&
            this.minute() === other.minute!() &&
            this.second() === other.second!() &&
            this.millisecond() === other.millisecond!())))
      /* eslint-enable @typescript-eslint/no-non-null-assertion */
    );
  }

  /**
   * Compares the `AdaptedDateTime` to the other `AdaptedDateTime` with respect to the temporal positions. A value of -1 is returned when
   * this value is before the other value, 1 is returned for the opposite case and 0 if they both represent the same time.
   *
   * Note that in some cases no comparison can be made, e.g. if one only has `'date'` components and the other only has `'time'` components.
   * In that date values are ordered before time values. The same is true when comparing values that both have `'date'` components and only
   * one of them has `'time'` components.
   */
  // eslint-disable-next-line complexity
  public compareTo(other: AdaptedDateTime<unknown>): number {
    if (this.has('epoch') && other.has('epoch')) {
      return this.epochTime() < other.epochTime() ? -1 : this.epochTime() > other.epochTime() ? 1 : 0;
    }

    if (this.has('date') && other.has('date')) {
      if (this.year() !== other.year()) {
        return this.year() < other.year() ? -1 : 1;
      }

      if (this.month() !== other.month()) {
        return this.month() < other.month() ? -1 : 1;
      }

      if (this.day() !== other.day()) {
        return this.day() < other.day() ? -1 : 1;
      }

      if (this.has('time') !== other.has('time')) {
        return this.has('time') ? 1 : -1;
      }
    }

    if (this.has('date') !== other.has('date')) {
      return this.has('date') ? -1 : 1;
    }

    if (this.has('time') && other.has('time')) {
      if (this.hour() !== other.hour()) {
        return this.hour() < other.hour() ? -1 : 1;
      }

      if (this.minute() !== other.minute()) {
        return this.minute() < other.minute() ? -1 : 1;
      }

      if (this.second() !== other.second()) {
        return this.second() < other.second() ? -1 : 1;
      }

      if (this.millisecond() !== other.millisecond()) {
        return this.millisecond() < other.millisecond() ? -1 : 1;
      }
    }

    return 0;
  }
}

export interface DateComponents {
  year(): number;
  month(): number;
  day(): number;
}

export interface TimeComponents {
  hour(): number;
  minute(): number;
  second(): number;
  millisecond(): number;
}

export interface EpochComponent {
  epochTime(): number;
}
