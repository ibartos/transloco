import { ChangeDetectionStrategy, Component } from "@angular/core";

import { TranslocoService } from "@jsverse/transloco";
import {getLocaleId} from "./app.module";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

    constructor(
        private translocoService: TranslocoService
    ) {
        this.translocoService.setActiveLang(getLocaleId());
    }
}
