import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "./environments/environment";

import {SportsbookModule} from "./presentation/features/sportsbook/sportsbook.module";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(SportsbookModule)
    .then(() => {})
    .catch();
