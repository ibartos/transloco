import { formatNumber } from "@angular/common";
import { Injectable } from "@angular/core";

import { filter, map, Observable, of } from "rxjs";

import { AppLocaleIdStream } from "../locale/locale-id.stream";
import { stripNumberGroupingSeparator } from "../utils/strip-number-grouping-separator";

import { NumberFormat } from "./number-format.model";
import { NumberFormatter } from "./number-formatter.model";
import { cache, notUndefined } from "../../utils";

@Injectable({ providedIn: "root" })
export class NumberFormatterService {
    constructor(private readonly defaultLocaleId$: AppLocaleIdStream) {}

    public getFormatter(
        baseFormat: NumberFormat,
        formatOverrides?: NumberFormat | string,
        emptyValue?: string
    ): Observable<NumberFormatter> {
        const digitsInfo =
            (typeof formatOverrides === "string" ? formatOverrides : formatOverrides?.digitsInfo) ??
            baseFormat.digitsInfo;
        const fixedLocaleId =
            (typeof formatOverrides === "string" ? undefined : formatOverrides?.localeId) ?? baseFormat.localeId;
        const useGroupingSeparator =
            (typeof formatOverrides === "string" ? undefined : formatOverrides?.useGroupingSeparator) ??
            baseFormat.useGroupingSeparator;
        const fallbackValue = emptyValue ?? "";

        const localeId$: Observable<string | undefined> =
            fixedLocaleId === undefined ? this.defaultLocaleId$ : of(fixedLocaleId);

        return localeId$.pipe(
            filter(notUndefined),
            map((localeId) => (value: unknown) => {
                const parsedValue = value === undefined || value === null || value === "" ? NaN : Number(value);

                if (isNaN(parsedValue)) {
                    return fallbackValue;
                }

                const formattedNumber = formatNumber(parsedValue, localeId, digitsInfo);

                return useGroupingSeparator ? formattedNumber : stripNumberGroupingSeparator(formattedNumber, localeId);
            }),
            cache()
        );
    }
}
