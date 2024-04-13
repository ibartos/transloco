import { Injectable } from "@angular/core";

import { filter, first, map, switchMap } from "rxjs";

import { loadTranslation } from "./utils/load-translation";
import { TranslateStream } from "../internationalization";
import { HashMap, TranslateParams, TranslocoService } from "@jsverse/transloco";
import { cache } from "../utils";

@Injectable()
export class TranslocoTranslateStream extends TranslateStream {
    constructor(translocoService: TranslocoService) {
        super(
            translocoService.langChanges$.pipe(
                switchMap((language) =>
                    loadTranslation(translocoService, language).pipe(
                        switchMap(() =>
                            translocoService.events$.pipe(
                                filter(
                                    (event) => event.type === "translationLoadSuccess" && event.wasFailure === false
                                ),
                                first(), // Take only the first success event for the current language.
                                map(() => language)
                            )
                        )
                    )
                ),
                map(
                    (language) => (key: TranslateParams, params?: HashMap) =>
                        translocoService.translate(key, params, language)
                ),
                cache()
            )
        );
    }
}
