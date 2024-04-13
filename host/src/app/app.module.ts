import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, isDevMode, LOCALE_ID, NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TranslocoRootModule } from './transloco-root.module';



export function getLocaleId(): string {
    // Example to determine the locale dynamically
    // You can replace the logic here based on how you determine the locale in your app
    // For instance, it could be based on the URL, a cookie, storage, or a global variable set in index.html
    const url = window.location.pathname;
    if (url.startsWith("/en")) {
        return "en"; // English
    }
    return isDevMode() ? "en" : "ro"; // Default to Romanian
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: "serverApp" }),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslocoRootModule,
    ],
    providers: [
        { provide: LOCALE_ID, useFactory: getLocaleId },

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
