import { Injectable } from "@angular/core";

import { AppLocaleService } from "./locale.service";
import { ProxyObservable } from "../../utils";

/**
 * An (injectable) observable stream that emits the identifier of the active locale. The active locale is defined as the locale that was
 * selected and for which all resources have finished loading (see `AppLocaleLoader` and `registerLocaleLoader`). This observable may emit
 * multiple values over time when the (application wide) locale is switched at runtime. While locale data is loading this stream emits
 * `undefined`.
 *
 * Note this stream is just a shortcut to inject `AppLocaleService.activeLocaleId$` directly into your services/components/directives/etc.
 */
@Injectable({ providedIn: "root" })
export class AppLocaleIdStream extends ProxyObservable<string | undefined> {
    constructor(localeService: AppLocaleService) {
        super(localeService.activeLocaleId$);
    }
}
