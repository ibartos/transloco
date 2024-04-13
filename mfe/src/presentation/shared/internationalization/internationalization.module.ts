import { InjectFlags, Injector, ModuleWithProviders, NgModule } from "@angular/core";
import { bindProvider, UnboundProvider } from "ngx-inject";

import { CurrencyFormat } from "./currency/currency-format.model";
import { APP_DEFAULT_CURRENCY_FORMAT } from "./currency/default-currency-format.token";
import { APP_DEFAULT_LOCALE_ID } from "./default-locale-id.token";
import { APP_LOCALE_ID_STORAGE_KEY, AppLocaleIdPersistenceService } from "./locale-id-persistence.service";
import { APP_DEFAULT_NUMBER_FORMAT } from "./number/default-number-format.token";
import { APP_DEFAULT_PERCENT_FORMAT } from "./number/default-percent-format.token";
import { NumberFormat } from "./number/number-format.model";
import { DateTimeFormatterResolver } from "./temporal/date-time-formatter-resolver.model";
import { DATE_TIME_FORMATTER_RESOLVER } from "./temporal/date-time-formatter-resolver.token";
import {
    APP_DEFAULT_DATE_FORMAT,
    APP_DEFAULT_DATE_TIME_FORMAT,
    APP_DEFAULT_TIME_FORMAT,
} from "./temporal/default-date-time-format.token";
import { EpochTimeDateTimeAdapter } from "./temporal/epoch-time-date-time-adapter";
import { IsoStringTimeDateTimeAdapter } from "./temporal/iso-string-date-time-adapter";
import { NativeDateTimeAdapter } from "./temporal/native-date-time-adapter";
import { registerDateTimeAdapter } from "./temporal/register-date-time-adapter";
import { StandardDateTimeFormatterResolver } from "./temporal/standard-date-time-formatter-resolver";

export interface AppInternationalizationModuleConfiguration {
    /** Identifier of the default locale that will be set when none has been selected. */
    defaultLocaleId?: string;

    /** Local storage key in which the selected locale will saved. The locale will not be stored (or loaded) when no key is specified. */
    localeIdStorageKey?: string;

    /** Default format to use for the `number` pipe. Defaults to `{ digits: '1.0-16', useGroupingSeparator: false }` when unspecified. */
    defaultNumberFormat?: UnboundProvider<NumberFormat>;

    /** Default format to use for the `percent` pipe. Defaults to `{ digits: '1.0-0', useGroupingSeparator: false }` when unspecified. */
    defaultPercentFormat?: UnboundProvider<NumberFormat>;

    /** Default format to use for the `currency` pipe. Defaults to `{ currencyCode: 'EUR', useGroupingSeparator: false }` when unspecified. */
    defaultCurrencyFormat?: UnboundProvider<CurrencyFormat>;

    defaultDateTimeFormat?: UnboundProvider<unknown>;

    defaultDateFormat?: UnboundProvider<unknown>;

    defaultTimeFormat?: UnboundProvider<unknown>;

    defaultDateTimeFormatterResolver?: UnboundProvider<DateTimeFormatterResolver<any, any, any>>; // eslint-disable-line @typescript-eslint/no-explicit-any,max-len
}

@NgModule({})
export class AppInternationalizationModule {
    constructor(injector: Injector) {
        // if (!isRootInjector(injector)) {
        //     throw new Error(
        //         "AppInternationalizationModule should be imported in the root module (usually called AppModule)."
        //     );
        // }

        // Load background services.
        injector.get(AppLocaleIdPersistenceService, undefined, InjectFlags.Optional);
    }

    public static forRoot(
        configuration: AppInternationalizationModuleConfiguration = {}
    ): ModuleWithProviders<AppInternationalizationModule> {
        return {
            ngModule: AppInternationalizationModule,
            providers: [
                configuration.defaultLocaleId
                    ? [{ provide: APP_DEFAULT_LOCALE_ID, useValue: configuration.defaultLocaleId }]
                    : [],
                configuration.localeIdStorageKey
                    ? [
                          {
                              provide: APP_LOCALE_ID_STORAGE_KEY,
                              useValue: configuration.localeIdStorageKey,
                          },
                      ]
                    : [],
                AppLocaleIdPersistenceService,
                bindProvider(APP_DEFAULT_NUMBER_FORMAT, configuration.defaultNumberFormat, {
                    default: { useValue: { digitsInfo: "1.0-16", useGroupingSeparator: false } },
                }),
                bindProvider(APP_DEFAULT_PERCENT_FORMAT, configuration.defaultPercentFormat, {
                    default: { useValue: { digitsInfo: "1.0-0", useGroupingSeparator: false } },
                }),
                bindProvider(APP_DEFAULT_CURRENCY_FORMAT, configuration.defaultCurrencyFormat, {
                    default: { useValue: { currencyCode: "EUR", digitsInfo: "1.2-2", useGroupingSeparator: false } },
                }),
                bindProvider(APP_DEFAULT_DATE_TIME_FORMAT, configuration.defaultDateTimeFormat, {
                    default: { useValue: "short" },
                }),
                bindProvider(APP_DEFAULT_DATE_FORMAT, configuration.defaultDateFormat, {
                    default: { useValue: "shortDate" },
                }),
                bindProvider(APP_DEFAULT_TIME_FORMAT, configuration.defaultTimeFormat, {
                    default: { useValue: "mediumTime" },
                }),
                bindProvider(DATE_TIME_FORMATTER_RESOLVER, configuration.defaultDateTimeFormatterResolver, {
                    default: StandardDateTimeFormatterResolver,
                }),

                registerDateTimeAdapter({ useExisting: NativeDateTimeAdapter }),
                registerDateTimeAdapter({ useExisting: EpochTimeDateTimeAdapter }),
                registerDateTimeAdapter({ useExisting: IsoStringTimeDateTimeAdapter }),
            ],
        };
    }
}
