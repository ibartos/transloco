import { Injectable, OnDestroy } from "@angular/core";

import { filter, Subscription } from "rxjs";
import { notUndefined } from "../utils";
import { AppLocaleIdStream } from "../internationalization";
import { TranslocoService } from "@jsverse/transloco";

@Injectable()
export class LocaleSynchronizationService implements OnDestroy {
    private readonly subscriptions = new Subscription();

    constructor(
        private readonly translocoService: TranslocoService,
        private readonly localeId$: AppLocaleIdStream
    ) {
        this.subscriptions.add(this.pushLocaleIdChangesToTranslocoService());
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private pushLocaleIdChangesToTranslocoService(): Subscription {
        return this.localeId$
            .pipe(filter(notUndefined))
            .subscribe((localeId) => this.translocoService.setActiveLang(localeId));
    }
}
