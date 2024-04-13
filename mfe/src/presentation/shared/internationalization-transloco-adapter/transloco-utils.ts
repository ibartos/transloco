import { NotUndefined } from "../utils";
import { toCamelCase, TranslocoScope } from "@jsverse/transloco";

export function getScopeName(scope: NotUndefined<TranslocoScope>): string {
    return typeof scope === "object" ? scope.scope : scope;
}

export function getScopeAlias(scope: NotUndefined<TranslocoScope>): string {
    // Implementation is based on how Transloco determines the alias:
    // https://github.com/ngneat/transloco/blob/master/projects/ngneat/transloco/src/lib/scope-resolver.ts

    if (typeof scope === "object" && scope.alias !== undefined) {
        return scope.alias;
    }

    return toCamelCase(getScopeName(scope));
}
