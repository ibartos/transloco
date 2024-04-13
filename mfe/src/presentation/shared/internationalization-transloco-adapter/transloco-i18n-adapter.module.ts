import { inject, InjectFlags, InjectionToken, Injector, ModuleWithProviders, NgModule } from "@angular/core";

import { bindProvider, UnboundProvider } from "ngx-inject";

import { LocaleSynchronizationService } from "./locale-synchronization.service";
import { PartialTranslocoConfig } from "./models/partial-transloco-config.model";
import { TranslocoLocaleLoader } from "./transloco-locale-loader";
import { TranslocoTranslateStream } from "./transloco-translate.stream";
import { registerLocaleLoader, TranslateStream } from "../internationalization";
import {
    provideTransloco,
    TRANSLOCO_CONFIG,
    TRANSLOCO_LOADER,
    translocoConfig,
    TranslocoLoader,
} from "@jsverse/transloco";

export interface AppTranslocoI18nAdapterModuleConfiguration {
    /** Whether to push the selected locale from the `AppLocaleService` to Transloco. Enabled by default. Set this to `false` to disable. */
    synchronizeWithLocaleService?: boolean;

    /** The Transloco configuration. Specifying this is similar to manually defining a provider for `TRANSLOCO_CONFIG`. */
    translocoConfig?: UnboundProvider<PartialTranslocoConfig>;

    /** The Transloco translation loader. Specifying this is similar to manually defining a provider for `TRANSLOCO_LOADER`. */
    translocoLoader?: UnboundProvider<TranslocoLoader>;
}

export const PARTIAL_TRANSLOCO_CONFIG = new InjectionToken<PartialTranslocoConfig>("PARTIAL_TRANSLOCO_CONFIG");

@NgModule({})
export class AppTranslocoI18nAdapterModule {
    constructor(injector: Injector) {
        // if (!isRootInjector(injector)) {
        //     throw new Error(
        //         "AppTranslocoI18nAdapterModule should be imported in the root module (usually called AppModule)."
        //     );
        // }

        // Load background services.
        injector.get(LocaleSynchronizationService, undefined, InjectFlags.Optional);
    }

    public static forRoot(
        configuration: AppTranslocoI18nAdapterModuleConfiguration = {}
    ): ModuleWithProviders<AppTranslocoI18nAdapterModule> {
        return {
            ngModule: AppTranslocoI18nAdapterModule,
            providers: [
                { provide: TranslateStream, useClass: TranslocoTranslateStream },

                configuration.synchronizeWithLocaleService !== false ? LocaleSynchronizationService : [],

                provideTransloco({ config: {} }),

                configuration.translocoConfig !== undefined
                    ? [
                          bindProvider(PARTIAL_TRANSLOCO_CONFIG, configuration.translocoConfig),
                          {
                              provide: TRANSLOCO_CONFIG,
                              useFactory: () => translocoConfig(inject(PARTIAL_TRANSLOCO_CONFIG)),
                          },
                      ]
                    : [],

                configuration.translocoLoader !== undefined
                    ? bindProvider(TRANSLOCO_LOADER, configuration.translocoLoader)
                    : [],

                registerLocaleLoader(TranslocoLocaleLoader),
            ],
        };
    }
}
