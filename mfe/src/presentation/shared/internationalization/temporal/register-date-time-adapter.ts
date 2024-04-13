import { Provider } from "@angular/core";

import { DateTimeAdapter } from "./date-time-adapter.model";
import { bindProvider, UnboundProvider } from "../../utils";

/** Creates a `Provider` to register the specified `DateTimeAdapter`. */
export function registerDateTimeAdapter(dateTimeAdapter: UnboundProvider<DateTimeAdapter<unknown>>): Provider {
    return bindProvider(DateTimeAdapter, dateTimeAdapter, { multi: true });
}
