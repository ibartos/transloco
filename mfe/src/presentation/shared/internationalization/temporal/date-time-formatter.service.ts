import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AdaptedDateTime } from './adapted-date-time.model';
import { DateTimeConverterService } from './date-time-converter.service';
import { DateTimeFormatterResolver } from './date-time-formatter-resolver.model';
import { DATE_TIME_FORMATTER_RESOLVER } from './date-time-formatter-resolver.token';
import { DateTimeFormatter } from './date-time-formatter.model';
import { APP_DEFAULT_DATE_FORMAT, APP_DEFAULT_DATE_TIME_FORMAT, APP_DEFAULT_TIME_FORMAT } from './default-date-time-format.token';

@Injectable({ providedIn: 'root' })
export class DateTimeFormatterService {
  constructor(
    @Inject(DATE_TIME_FORMATTER_RESOLVER) private readonly dateTimeFormatterResolver: DateTimeFormatterResolver<unknown, unknown, unknown>,
    @Inject(APP_DEFAULT_DATE_FORMAT) protected readonly defaultDateFormat: unknown,
    @Inject(APP_DEFAULT_TIME_FORMAT) protected readonly defaultTimeFormat: unknown,
    @Inject(APP_DEFAULT_DATE_TIME_FORMAT) protected readonly defaultDateTimeFormat: unknown,
    private readonly dateTimeConverterService: DateTimeConverterService,
  ) {}

  public getDefaultFormatter(
    type: 'date' | 'time' | 'dateTime',
    formatOverrides?: unknown,
    emptyValue?: string,
  ): Observable<DateTimeFormatter<unknown>> {
    const baseFormat = type === 'date' ? this.defaultDateFormat : type === 'time' ? this.defaultTimeFormat : this.defaultDateTimeFormat;

    return this.getFormatter(baseFormat, formatOverrides, emptyValue);
  }

  public getFormatter(baseFormat: unknown, formatOverrides?: unknown, emptyValue?: string): Observable<DateTimeFormatter<unknown>> {
    if (formatOverrides !== undefined && !this.dateTimeFormatterResolver.supportsPartialFormat(formatOverrides)) {
      throw new Error(`Unsupported partial format: ${String(formatOverrides)}`);
    }

    if (!this.dateTimeFormatterResolver.supportsFormat(baseFormat)) {
      throw new Error(`Unsupported format: ${String(baseFormat)}`);
    }

    const format = formatOverrides !== undefined ? this.dateTimeFormatterResolver.merge(baseFormat, formatOverrides) : baseFormat;

    const fallbackValue = emptyValue ?? '';

    return this.dateTimeFormatterResolver.resolve(format).pipe(
      map((formatDateTime) => (dateTime: unknown) => {
        if (dateTime === undefined || dateTime === null) {
          return fallbackValue;
        }

        const adaptedDateTime = this.adaptDateTime(dateTime);

        if (adaptedDateTime === undefined || adaptedDateTime === null) {
          return fallbackValue;
        }

        return formatDateTime(adaptedDateTime);
      }),
    );
  }

  private adaptDateTime(dateTime: unknown): unknown {
    if (dateTime instanceof AdaptedDateTime && this.dateTimeFormatterResolver.adapter.supports(dateTime.get())) {
      return dateTime.get();
    }

    if (this.dateTimeFormatterResolver.adapter.supports(dateTime)) {
      return dateTime;
    }

    return this.dateTimeConverterService.convert(dateTime, this.dateTimeFormatterResolver.adapter);
  }
}
