import { NgModule } from "@angular/core";
import { AppInternationalizationModule, registerAngularLocaleDataLoader } from "../../shared/internationalization";

import { CORE_TRANSLATION_KEYS } from "../core-translation-keys";
import { AppTranslocoI18nAdapterModule } from "../../shared/internationalization-transloco-adapter";
import { TranslocoTranslationModuleLoader } from "./transloco-translation-module-loader";
import { defer, from } from "rxjs";
import { environment } from "../../../environments/environment";

@NgModule({
    imports: [
        AppInternationalizationModule.forRoot({
            defaultLocaleId: "en",
            localeIdStorageKey: 'language',
            defaultDateFormat: { formatKey: CORE_TRANSLATION_KEYS.DATE_TIME.FORMATS.DAY_MONTH_YEAR },
            defaultTimeFormat: { formatKey: CORE_TRANSLATION_KEYS.DATE_TIME.FORMATS.FULL_HOUR_MINUTE },
            defaultDateTimeFormat: { formatKey: CORE_TRANSLATION_KEYS.DATE_TIME.FORMATS.DAY_MONTH_YEAR },
            defaultCurrencyFormat: { digitsInfo: "1.0-0" },
            defaultPercentFormat: { digitsInfo: "1.0-0" },
        }),
        AppTranslocoI18nAdapterModule.forRoot({
            translocoConfig: {
                availableLangs: [
                    { id: "en", label: "English" },
                    { id: "ro", label: "Romanian" },
                ],
                defaultLang: "en",
                reRenderOnLangChange: false,
                prodMode: environment.production,
            },
            translocoLoader: TranslocoTranslationModuleLoader,
        }),
    ],
    providers: [
        registerAngularLocaleDataLoader({
            en: defer(() => from(import("@angular/common/locales/en"))),
            ro: defer(() => from(import("@angular/common/locales/ro"))),
        }),
    ],
})
export class InternationalizationModule {}

// @NgModule({
//     exports: [TranslocoModule],
//     providers: [
//         provideTransloco({
//             config: {
//                 availableLangs: ["en", "ro"],
//                 defaultLang: "en",
//                 // Remove this option if your application doesn't support changing language in runtime.
//                 reRenderOnLangChange: true,
//                 prodMode: environment.production,
//             },
//             loader: TranslocoHttpLoader,
//         }),
//     ],
// })
// export class InternationalizationModule {}
