import { InjectionToken } from '@angular/core';

import { CurrencyFormat } from './currency-format.model';

export const APP_DEFAULT_CURRENCY_FORMAT = new InjectionToken<CurrencyFormat>('APP_DEFAULT_CURRENCY_FORMAT');
