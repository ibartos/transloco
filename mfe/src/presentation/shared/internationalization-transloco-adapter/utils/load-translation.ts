import { catchError, combineLatest, map, Observable, of, take } from "rxjs";
import { TranslocoService } from "@jsverse/transloco";

export function loadTranslation(translocoService: TranslocoService, language: string): Observable<void> {
    const translationLoaders = [
        translocoService.selectTranslation(language),
        ...Array.from(Object.keys(translocoService.config.scopeMapping ?? {})).map((scope) =>
            translocoService.selectTranslation(`${scope}/${language}`)
        ),
    ];

    return combineLatest(
        translationLoaders.map((loadTranslation$) =>
            loadTranslation$.pipe(
                take(1),
                catchError(() => of(undefined))
            )
        )
    ).pipe(map(() => undefined));
}
