import { Observable } from 'rxjs';

import { DateTimeAdapter } from './date-time-adapter.model';
import { DateTimeFormatter } from './date-time-formatter.model';

/**
 * Interface that is used for defining services capable of converting date/time formats to formatter functions that accept a specific
 * date/time model and convert those values to strings.
 */
export interface DateTimeFormatterResolver<DateTimeType, DateTimeFormat, PartialDateTimeFormat> {
  /** A date adapter that is compatible with date/time model used by the resolved formatting function. */
  readonly adapter: DateTimeAdapter<DateTimeType>;

  /**
   * Checks whether the specified format is supported by the resolver, i.e. whether it is valid input for the `resolve` function.
   *
   * @param format Format which is to be checked.
   * @returns      A type predicate which is `true` when the specified format is a valid (sub)type of `DateTimeFormat`.
   */
  supportsFormat(format: unknown): format is DateTimeFormat;

  /**
   * Checks whether the specified format is a supported partial format that can be merged with a full format via the `merge` function.
   *
   * @param format Format which is to be checked.
   * @returns      A type predicate which is `true` when the specified format is a valid (sub)type of `PartialDateTimeFormat`.
   */
  supportsPartialFormat(format: unknown): format is PartialDateTimeFormat;

  /**
   * Merges the given base format with the specified partial format to create a new format where the partial format is overlayed on top of
   * the base format.
   */
  merge(baseFormat: DateTimeFormat, partialFormat: PartialDateTimeFormat): DateTimeFormat;

  /**
   * Resolves the date/time formatter function for the specified format. Note that the formatter is returned as an observable, because the
   * actual formatting usually depends on other variables that can change at runtime. So this means that the resulting
   * observable may emit multiple formatting functions over time, e.g. when the locale is changed.
   *
   * @param format Format for which the formatter function is to be resolved.
   * @returns      An observable that emits the formatting function that is to be used for the specified format.
   */
  resolve(format: DateTimeFormat): Observable<DateTimeFormatter<DateTimeType>>;
}
