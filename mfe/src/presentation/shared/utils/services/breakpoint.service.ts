import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Memoized } from "../decorators/memoized.decorator";
import { cache } from "../rxjs/cache.operator";

/**
 * Max width for mobile devices, used with BreakpointObserver to handle responsive behavior.
 */
const MAX_WIDTH_MOBILE = "(max-width:1279px)";
const MAX_WIDTH_SMALL_DEVICE = "(max-width:767px)";

@Injectable({
    providedIn: "root",
})
export class BreakpointService {
    private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

    @Memoized public get isMobile$(): Observable<boolean> {
        return this.breakpointObserver.observe(MAX_WIDTH_MOBILE).pipe(
            map((breakpointState: BreakpointState) => breakpointState.matches),
            cache()
        );
    }

    @Memoized public get isDesktop$(): Observable<boolean> {
        return this.breakpointObserver.observe([MAX_WIDTH_SMALL_DEVICE]).pipe(
            map((state: BreakpointState) => !state.matches),
            cache()
        );
    }
}
