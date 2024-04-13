import { Pipe, PipeTransform, inject } from '@angular/core';

import { APP_DEFAULT_TIME_FORMAT } from '../../temporal/default-date-time-format.token';

import { AppBaseDateTimeFormatPipe } from './base-date-time-format.pipe';

@Pipe({
  name: 'time',
  pure: false, // eslint-disable-line @angular-eslint/no-pipe-impure
  standalone: true,
})
export class AppTimeFormatPipe extends AppBaseDateTimeFormatPipe implements PipeTransform {
  protected getDefaultFormat(): unknown {
    return inject(APP_DEFAULT_TIME_FORMAT);
  }
}
