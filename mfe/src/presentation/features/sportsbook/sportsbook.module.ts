import { NgModule } from "@angular/core";
import { SportsbookRoutingModule } from "./sportsbook-routing.module";
import { provideTranslocoScope } from "@jsverse/transloco";
import { TranslateStream } from "../../shared/internationalization";
import { TranslocoTranslateStream } from "../../shared/internationalization-transloco-adapter/transloco-translate.stream";
import {InternationalizationModule} from "../../core/internationalization";

const loader = ["en", "ro"].reduce((acc, lang) => {
    // @ts-expect-error
    acc[lang] = () => import(`../../../assets/i18n/${lang}.ts`);
    return acc;
}, {});

@NgModule({
    declarations: [],
    imports: [
        InternationalizationModule,
        SportsbookRoutingModule,
    ],

    providers: [
        { provide: TranslateStream, useClass: TranslocoTranslateStream },

        provideTranslocoScope({
            scope: "sportsbook",
            loader,
        }),
    ],
})
export class SportsbookModule {}
