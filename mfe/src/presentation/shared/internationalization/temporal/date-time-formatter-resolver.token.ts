import { InjectionToken } from '@angular/core';

import { DateTimeFormatterResolver } from './date-time-formatter-resolver.model';

export const DATE_TIME_FORMATTER_RESOLVER = new InjectionToken<DateTimeFormatterResolver<unknown, unknown, unknown>>(
  'DATE_TIME_FORMATTER_RESOLVER',
);
