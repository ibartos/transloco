import { NgModule } from '@angular/core';

import { AppDateFormatPipe } from './date-format.pipe';
import { AppDateTimeFormatPipe } from './date-time-format.pipe';
import { AppTimeFormatPipe } from './time-format.pipe';

@NgModule({
  imports: [
    AppDateFormatPipe,
    AppDateTimeFormatPipe,
    AppTimeFormatPipe,
  ],
  exports: [
    AppDateFormatPipe,
    AppDateTimeFormatPipe,
    AppTimeFormatPipe,
  ],
})
export class AppDateTimeFormatPipeModule {}
