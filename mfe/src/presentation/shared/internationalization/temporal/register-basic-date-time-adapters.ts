import { Provider } from '@angular/core';

import { BasicDateAdapter } from './basic-date-adapter';
import { BasicDateTimeAdapter } from './basic-date-time-adapter';
import { BasicTimeAdapter } from './basic-time-adapter';
import { registerDateTimeAdapter } from './register-date-time-adapter';

export interface RegisterBasicDateTimeAdaptersConfiguration {
  /** Whether to include an adapter for the `BasicDateTime` model. Defaults to `true`. */
  dateTime?: boolean;

  /** Whether to include an adapter for the `BasicDate` model. Defaults to `true`. */
  date?: boolean;

  /** Whether to include an adapter for the `BasicTime` model. Defaults to `true`. */
  time?: boolean;
}

/**
 * Returns a provider that can be used to register date time adapters for the `BasicDateTime`, `BasicDate` and `BasicTime` models.
 *
 * **It is highly recommended to use the `registerBasicDateTimeAdapters` function after registering any other date time adapters!**
 * This is because these basic date time adapters do a structural check on date/time values to see if they support that model. This could
 * lead to false positives, e.g. Luxon's `DateTime` instances have a structural match.
 *
 * You can optionally specify for which basic date/time models a date/time adapter should be provided using the `configuration` parameter.
 *
 * @param configuration Object that allows you to define which basic date/time adapters should be included.
 * @returns             A `Provider` for the basic date/time adapters.
 */
export function registerBasicDateTimeAdapters(configuration?: RegisterBasicDateTimeAdaptersConfiguration): Provider {
  return [
    configuration?.dateTime ?? true ? registerDateTimeAdapter({ useExisting: BasicDateTimeAdapter }) : [],
    configuration?.date ?? true ? registerDateTimeAdapter({ useExisting: BasicDateAdapter }) : [],
    configuration?.time ?? true ? registerDateTimeAdapter({ useExisting: BasicTimeAdapter }) : [],
  ];
}
