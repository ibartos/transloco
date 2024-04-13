import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";

import {
    catchError,
    distinctUntilChanged,
    forkJoin,
    map,
    Observable,
    of,
    ReplaySubject,
    startWith,
    Subscription,
    switchMap,
} from "rxjs";

import { AppLocaleLoader } from "./locale-loader.model";
import { coerceToArray, ScalarOrArray } from "../../utils/collections/array/scalar-or-array.model";
import { cache, Memoized } from "../../utils";

@Injectable({ providedIn: "root" })
export class AppLocaleService implements OnDestroy {
    private readonly localeIdSubject = new ReplaySubject<string>(1);
    private readonly localeLoader: AppLocaleLoader;
    private readonly loadedLocales = new Map<string, Observable<void>>();
    private readonly subscriptions = new Subscription();

    constructor(@Inject(AppLocaleLoader) @Optional() localeLoaders: ScalarOrArray<AppLocaleLoader> | null) {
        this.localeLoader = createCombinedLocaleLoader(coerceToArray(localeLoaders ?? []));
        this.subscriptions.add(this.activeLocaleId$.subscribe()); // Needed to start loading locales as soon as possible.
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Selects a new (application wide) locale. This causes emits by the `selectedLocaleId$` and `activeLocaleId$` observables. If locale
     * loaders have been registered, those will be invoked for the new locale and the `activeLocaleId$` emits are delayed until those loaders
     * are finished.
     *
     * Resources for a particular locale are only loaded once. So, selecting a locale that was previously selected will not load the same
     * resources for that locale again.
     *
     * @param localeId Identifier of the new locale that is to be used by the application.
     */
    public setLocale(localeId: string): void {
        this.localeIdSubject.next(localeId);
    }

    /**
     * Makes sure the data for the specified locale is loaded. This does not change the current locale. Locale data for a specific locale is
     * only loaded once. So this function can safely be called multiple times for the same locale.
     *
     * @param localeId Identifier of the locale for which the data is to be loaded.
     * @returns        An observable that emits once the locale data has been loaded and then terimates with a complete event.
     */
    public loadLocale(localeId: string): Observable<void> {
        let localeLoaded$ = this.loadedLocales.get(localeId);

        if (!localeLoaded$) {
            localeLoaded$ = this.localeLoader.loadLocale(localeId).pipe(cache());

            this.loadedLocales.set(localeId, localeLoaded$);

            this.subscriptions.add(localeLoaded$.subscribe());
        }

        return localeLoaded$;
    }

    /**
     * Observable that emits the selected locale id. Immediately emits the current locale upon subscription (if one has been set before) and
     * emits whenever a new locale is selected. The emits occur **before** any locale related resources have been loaded by the registered
     * locale loaders (`AppLocaleLoader`).
     */
    @Memoized
    public get selectedLocaleId$(): Observable<string> {
        return this.localeIdSubject.pipe(distinctUntilChanged());
    }

    /**
     * Observable that emits the active locale id. The active locale is the one that has been selected and for which all resources have
     * finished loading via the registered `AppLocaleLoader` instances. Use this when you need to act upon locale changes and depend on the
     * resources to be available.
     *
     * When switching to another locale this observable emits `undefined` while the locale data is being loaded. Once the locale data has been
     * loaded it emits the identifier of the currently active locale. If you are not interested in the loading events themself and just want
     * to act on active locale changes you can filter those events out using:
     *
     * localeService.activeLocaleId$.pipe(
     *   filter(notUndefined),
     * )
     * ```
     */
    @Memoized
    public get activeLocaleId$(): Observable<string | undefined> {
        return this.selectedLocaleId$.pipe(
            switchMap((localeId) =>
                this.loadLocale(localeId).pipe(
                    map(() => localeId),
                    startWith(undefined)
                )
            ),
            cache()
        );
    }
}

function createCombinedLocaleLoader(localeLoaders: AppLocaleLoader[]): AppLocaleLoader {
    return {
        loadLocale: (localeId) =>
            forkJoin(
                localeLoaders.map((localeLoader) =>
                    localeLoader.loadLocale(localeId).pipe(
                        catchError((error) => {
                            console.error(`Failed to load data for locale ${localeId}:`, error); // eslint-disable-line no-console

                            return of(undefined);
                        })
                    )
                )
            ).pipe(map(() => undefined)),
    };
}
