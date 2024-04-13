import { NgModule } from "@angular/core";
import { ServerModule, ServerTransferStateModule } from "@angular/platform-server";
import { UniversalModule } from "@ng-web-apis/universal";
import { AppComponent } from "./app.component";

import { AppModule } from "./app.module";

@NgModule({
    imports: [AppModule, ServerModule, ServerTransferStateModule, UniversalModule],
    providers: [

        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AbsoluteUrlInterceptor,
        //     multi: true,
        // },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: ServerSideCachingInterceptor,
        //     multi: true,
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
