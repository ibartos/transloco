import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { loadTranslation } from "./utils/load-translation";
import { AppLocaleLoader } from "../internationalization";
import { TranslocoService } from "@jsverse/transloco";

@Injectable()
export class TranslocoLocaleLoader implements AppLocaleLoader {
    constructor(private readonly translocoService: TranslocoService) {}

    public loadLocale(localeId: string): Observable<void> {
        return loadTranslation(this.translocoService, localeId);
    }
}
