import { Inject, Injectable } from '@angular/core';

import { AdaptedDateTime } from './adapted-date-time.model';
import { DateTimeAdapter } from './date-time-adapter.model';

@Injectable({ providedIn: 'root' })
export class DateTimeConverterService {
  constructor(
    @Inject(DateTimeAdapter) private readonly dateTimeAdapters: DateTimeAdapter<unknown>[],
  ) {}

  public getAdapter<T>(dateTime: T): DateTimeAdapter<T> | undefined {
    return this.dateTimeAdapters.find((adapter): adapter is DateTimeAdapter<T> => adapter.supports(dateTime));
  }

  public adapt<T>(dateTime: AdaptedDateTime<T>): AdaptedDateTime<T>;
  public adapt<T>(dateTime: T): AdaptedDateTime<T> | undefined;
  public adapt<T>(dateTime: AdaptedDateTime<T> | T): AdaptedDateTime<T> | undefined {
    return dateTime instanceof AdaptedDateTime ? dateTime : this.getAdapter(dateTime)?.adapt(dateTime);
  }

  public convert<T, U>(dateTime: AdaptedDateTime<T>, target: DateTimeAdapter<U>): U;
  public convert<T, U>(dateTime: T, target: DateTimeAdapter<U>): U | undefined;
  public convert<T, U>(dateTime: AdaptedDateTime<T> | T, target: DateTimeAdapter<U>): U | undefined {
    if (dateTime instanceof AdaptedDateTime) {
      return target.convert(dateTime);
    }

    const sourceAdapter = this.getAdapter(dateTime);

    return sourceAdapter !== undefined ? target.convert(dateTime, sourceAdapter) : undefined;
  }
}
