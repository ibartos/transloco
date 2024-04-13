import { Injectable } from "@angular/core";
import { Memoized } from "../decorators";
import { Observable, defer, fromEvent, map, merge, of } from "rxjs";
import { cache } from "../rxjs/cache.operator";

@Injectable({ providedIn: "root" })
export class NetworkConnectionService {
    @Memoized
    public get isOnline$(): Observable<boolean> {
        return merge(
            defer(() => of(navigator.onLine)),
            fromEvent(window, "online").pipe(map(() => true)),
            fromEvent(window, "offline").pipe(map(() => false))
        ).pipe(cache());
    }
}
