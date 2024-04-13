import { Inject, Injectable } from "@angular/core";

import { catchError, combineLatest, first, map, Observable, of } from "rxjs";

import { getScopeName } from "./transloco-utils";
import { NotUndefined, notUndefined, ScalarOrArray } from "../utils";
import { TRANSLOCO_SCOPE, TranslocoScope, TranslocoService } from "@jsverse/transloco";

@Injectable()
export class WaitForScopesToBeLoaded {
    constructor(
        private readonly translocoService: TranslocoService,
        @Inject(TRANSLOCO_SCOPE) private readonly providedScope: ScalarOrArray<TranslocoScope>
    ) {}

    public canActivate(): Observable<true> {
        const scopes = (Array.isArray(this.providedScope) ? this.providedScope : [this.providedScope]).filter(
            notUndefined
        );

        return combineLatest(scopes.map(loadScope(this.translocoService))).pipe(map(() => true));
    }
}

function loadScope(translocoService: TranslocoService): (scope: NotUndefined<TranslocoScope>) => Observable<void> {
    return (scope) =>
        translocoService.selectTranslation(getScopeName(scope)).pipe(
            first(),
            map(() => undefined),
            catchError(() => of(undefined))
        );
}
