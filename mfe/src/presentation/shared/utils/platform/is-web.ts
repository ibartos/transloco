import { inject } from "@angular/core";
import { isBrowser } from "./is-browser";
import { Platform } from "@angular/cdk/platform";

/**
 * Detect platform. IOS/ANDROID
 */
export const isWeb = (): boolean => {
    const isPlatformBrowser = isBrowser();
    const platform = inject(Platform);
    return isPlatformBrowser ? !(platform.IOS || platform.ANDROID) : false;
};
