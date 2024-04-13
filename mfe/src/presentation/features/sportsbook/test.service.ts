import {inject, Injectable} from '@angular/core';
import {CORE_TRANSLATION_KEYS} from "../../core/core-translation-keys";
import {TranslocoService} from "@jsverse/transloco";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestService {
    private TRANSLATIONS = CORE_TRANSLATION_KEYS.HEADER.HOME;
    private translocoService = inject(TranslocoService);

    public getTranslation() :Observable<string> {
        return this.translocoService.selectTranslate(this.TRANSLATIONS);
    }
}
