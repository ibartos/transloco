import { registerLocaleData } from "@angular/common";
import { Inject, Injectable, InjectionToken, Provider } from "@angular/core";
import { map, Observable, throwError } from "rxjs";

import { AppLocaleLoader, registerLocaleLoader } from "./locale-loader.model";

interface AngularLocaleDataModule {
    default: unknown;
}

type AngularLocaleDataLoaderMap = Record<string, Observable<AngularLocaleDataModule>>;

/**
 * Registers a locale loader that will load Angular locales from `@angular/common/locales/*` using the specified map.
 *
 * Example usage:
 *
 * ```typescript
 * registerAngularLocaleDataLoader({
 *  en: defer(() => from(import('@angular/common/locales/en-GB'))),
 *  ro: defer(() => from(import('@angular/common/locales/ro'))),
 * })
 * ```
 *
 * @param dataLoaderMap An object where the keys are locale identifiers and the values are observables that load the corresponding Angular
 *                      locale data module.
 */
export function registerAngularLocaleDataLoader(dataLoaderMap: AngularLocaleDataLoaderMap): Provider {
    return [
        { provide: ANGULAR_LOCALE_DATA_LOADER_MAP, useFactory: () => dataLoaderMap },
        registerLocaleLoader(AngularLocaleLoader),
    ];
}

export const ANGULAR_LOCALE_DATA_LOADER_MAP = new InjectionToken<AngularLocaleDataLoaderMap>(
    "ANGULAR_LOCALE_DATA_LOADER_MAP"
);

@Injectable()
export class AngularLocaleLoader implements AppLocaleLoader {
    constructor(@Inject(ANGULAR_LOCALE_DATA_LOADER_MAP) private readonly dataLoaderMap: AngularLocaleDataLoaderMap) {}

    public loadLocale(localeId: string): Observable<void> {
        const localeData$ = this.dataLoaderMap[localeId];

        if (localeData$ === undefined) {
            return throwError(() => new Error(`No locale data mapping is available for locale id "${localeId}"`));
        }

        return localeData$.pipe(
            map((localeData) => {
                registerLocaleData(overrideLocaleId(localeData.default, localeId));

                return undefined;
            })
        );
    }
}

function overrideLocaleId(localeData: unknown, localeId: string): unknown {
    if (!Array.isArray(localeData)) {
        return localeData;
    }

    return [localeId, ...(localeData.slice(1) as unknown[])] as unknown;
}
