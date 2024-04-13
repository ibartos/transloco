import { Injectable } from "@angular/core";

import { map, Observable } from "rxjs";
import { RelativeDateTranslationLoader } from "./models/relative-date-translation-loader.model";
import { RelativeDateTranslationGroup } from "./models/relative-date-translation-group.interface";
import { TranslocoService } from "@jsverse/transloco";

@Injectable({ providedIn: "root" })
export class AppRelativeDateTranslationLoader extends RelativeDateTranslationLoader {
    constructor(private readonly translocoService: TranslocoService) {
        super();
    }

    public loadTranslation(locale: string): Observable<RelativeDateTranslationGroup> {
        return this.translocoService.selectTranslation(locale).pipe(
            map((translations) => ({
                // These relative tokens should be literal and not contain a format string. To ensure they are not formatted
                // by luxon we quote them (if not already done)
                // lastDay: quote(translations[CORE_TRANSLATION_KEYS.DATE_TIME.YESTERDAY] as string),
                // nextDay: quote(translations[CORE_TRANSLATION_KEYS.DATE_TIME.TOMORROW] as string),
                // sameDay: quote(translations[CORE_TRANSLATION_KEYS.DATE_TIME.TODAY] as string),
                //
                // dateInputDisplay: translations[CORE_TRANSLATION_KEYS.DATE_TIME.FORMATS.WEEKDAY_DAY_MONTH] as string,
            }))
        );
    }
}

function quote(value: string): string {
    if (!value) {
        return value;
    }

    const prefix = value.startsWith("'") ? "" : "'";
    const suffix = value.at(-1) === "'" ? "" : "'";

    return prefix + value + suffix;
}
