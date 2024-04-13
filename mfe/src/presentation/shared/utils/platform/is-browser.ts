import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

/**
 * SSR
 * Check if the code runs in Browser
 * @return boolean - True if on Browser & False is on Server
 */
export const isBrowser = (): boolean => {
    const platformId: unknown = inject(PLATFORM_ID);
    return isPlatformBrowser(platformId as object);
};
