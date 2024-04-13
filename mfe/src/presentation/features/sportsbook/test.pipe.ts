import { inject, Pipe, PipeTransform } from "@angular/core";
import { CORE_TRANSLATION_KEYS } from "../../core/core-translation-keys";
import { TranslocoService } from "@jsverse/transloco";

@Pipe({
    name: "test",
    standalone: true,
})
export class TestPipe implements PipeTransform {
    //private translateStream = inject(TranslateStream);
    private TRANSLATIONS = CORE_TRANSLATION_KEYS.HEADER.HOME;
    private translocoService = inject(TranslocoService);

    transform(value: unknown, ...args: unknown[]): unknown {
        this.translocoService.selectTranslate(this.TRANSLATIONS).subscribe((translate) => {
            console.log("TRANSLATION MADE FROM A PIPE", translate);
        });
        return null;
    }
}
