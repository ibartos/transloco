import { Observable } from "rxjs";

import { TranslateFunction } from "./translate-function.model";
import { ProxyObservable } from "../../utils";

export abstract class TranslateStream extends ProxyObservable<TranslateFunction> {
    protected constructor(translate$: Observable<TranslateFunction>) {
        super(translate$);
    }
}
