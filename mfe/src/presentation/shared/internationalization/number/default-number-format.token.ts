import { InjectionToken } from '@angular/core';

import { NumberFormat } from './number-format.model';

export const APP_DEFAULT_NUMBER_FORMAT = new InjectionToken<NumberFormat>('APP_DEFAULT_NUMBER_FORMAT');
