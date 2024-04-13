import { Inject, ModuleWithProviders, NgModule } from "@angular/core";

import { getScopeAlias, getScopeName } from "./transloco-utils";
import { WaitForScopesToBeLoaded } from "./wait-for-scopes-to-be-loaded.guard";
import { notUndefined, ScalarOrArray } from "../utils";
import { TRANSLOCO_SCOPE, TranslocoScope, TranslocoService } from "@jsverse/transloco";

/**
 * Generates a `ModuleWithProviders` model value that can be added in the `imports` list of an `@NgModule` and which serves the following
 * two purposes:
 *
 *  - It generates the correct `Provider` to define the Transloco scope.
 *  - It eager loads the scope (using `TranslocoScopeLoaderModule`), such that usage of the scope does not need to rely on it being used
 *    in one of the templates (via the Transloco directive or pipe).
 */
export function defineAndLoadTranslocoScope(
    scope: string,
    alias?: string
): ModuleWithProviders<TranslocoScopeLoaderModule> {
    return {
        ngModule: TranslocoScopeLoaderModule,
        providers: [{ provide: TRANSLOCO_SCOPE, useValue: { scope, alias }, multi: true }, WaitForScopesToBeLoaded],
    };
}

@NgModule({})
export class TranslocoScopeLoaderModule {
    constructor(
        translocoService: TranslocoService,
        @Inject(TRANSLOCO_SCOPE) providedScope: ScalarOrArray<TranslocoScope>
    ) {
        const scopes = (Array.isArray(providedScope) ? providedScope : [providedScope]).filter(notUndefined);

        for (const scope of scopes) {
            const scopeName = getScopeName(scope);
            const scopeAlias = getScopeAlias(scope);

            translocoService._setScopeAlias(scopeName, scopeAlias);
            translocoService.selectTranslation(scopeName).subscribe();
        }
    }
}
