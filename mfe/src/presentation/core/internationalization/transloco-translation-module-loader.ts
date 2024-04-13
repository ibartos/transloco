import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@jsverse/transloco";
import { HttpClient } from "@angular/common/http";

interface TranslationModule {
    default: Translation;
}

@Injectable({ providedIn: "root" })
export class TranslocoTranslationModuleLoader implements TranslocoLoader {
    // public getTranslation(langPath: string): Observable<Translation> {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //     alert(`2212`);
    //     return from<Promise<TranslationModule>>(
    //         import(`../../../assets/i18n/translations/${langPath.toLowerCase()}.ts`).then((module) => {
    //             alert(`2213`);
    //             console.log(module, "module");
    //             return module as TranslationModule;
    //         })
    //     ).pipe(map((module) => module.default));
    // }

    private http = inject(HttpClient);

    getTranslation(lang: string) {
        return this.http.get<Translation>(`../../../assets/i18n/translations/${lang.toLowerCase()}.ts`);
    }
}
