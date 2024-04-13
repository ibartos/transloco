import { NgModule } from '@angular/core';

import { UiTextPipe } from './ui-text.pipe';

@NgModule({
  imports: [
    UiTextPipe,
  ],
  exports: [
    UiTextPipe,
  ],
})
export class UiTextModule {}
