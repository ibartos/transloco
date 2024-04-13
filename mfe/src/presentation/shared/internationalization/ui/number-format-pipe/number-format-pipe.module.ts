import { NgModule } from '@angular/core';

import { AppNumberFormatPipe } from './number-format.pipe';

@NgModule({
  imports: [
    AppNumberFormatPipe,
  ],
  exports: [
    AppNumberFormatPipe,
  ],
})
export class AppNumberFormatPipeModule {}
