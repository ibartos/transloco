import { formatCurrency, getCurrencySymbol } from "@angular/common";
import { ChangeDetectorRef, Inject, Pipe, PipeTransform } from "@angular/core";

import { combineLatest, distinctUntilChanged, map, Observable } from "rxjs";

import { AppCurrencyDisplayToken } from "../../currency/currency-display-token.enum";
import { CurrencyFormat } from "../../currency/currency-format.model";
import { APP_DEFAULT_CURRENCY_FORMAT } from "../../currency/default-currency-format.token";
import { AppLocaleIdStream } from "../../locale/locale-id.stream";
import { stripNumberGroupingSeparator } from "../../utils/strip-number-grouping-separator";
import { AppBaseNumberFormatPipe } from "../number-format-pipe/base-number-format.pipe";
import { cache, Memoized } from "../../../utils";

@Pipe({
    name: "currency",
    pure: false, // eslint-disable-line @angular-eslint/no-pipe-impure
    standalone: true,
})
export class AppCurrencyFormatPipe
    extends AppBaseNumberFormatPipe<CurrencyFormat, string | CurrencyFormat>
    implements PipeTransform
{
    constructor(
        @Inject(APP_DEFAULT_CURRENCY_FORMAT) private readonly defaultFormat: CurrencyFormat,
        changeDetectorRef: ChangeDetectorRef,
        defaultLocaleId$: AppLocaleIdStream
    ) {
        super(changeDetectorRef, defaultLocaleId$);
    }

    @Memoized
    protected get formattedValue$(): Observable<string | undefined> {
        return combineLatest([
            this.value$,
            this.currencyCode$,
            this.displayToken$,
            this.digitsInfo$,
            this.localeId$,
            this.useGroupingSeparator$,
        ]).pipe(
            map(([value, currencyCode, displayToken, digitsInfo, localeId, useGroupingSeparator]) => {
                if (value === undefined) {
                    return undefined;
                }

                const currencyToken =
                    displayToken === AppCurrencyDisplayToken.Symbol ||
                    displayToken === AppCurrencyDisplayToken.SymbolNarrow
                        ? getCurrencySymbol(
                              currencyCode,
                              displayToken === AppCurrencyDisplayToken.Symbol ? "wide" : "narrow",
                              localeId
                          )
                        : displayToken === AppCurrencyDisplayToken.Code
                          ? currencyCode.toUpperCase()
                          : displayToken;

                try {
                    const formattedCurrency = formatCurrency(value, localeId, currencyToken, currencyCode, digitsInfo);

                    return useGroupingSeparator
                        ? formattedCurrency
                        : stripNumberGroupingSeparator(formattedCurrency, localeId);
                } catch (error) {
                    this.reportError("Failed to format input value", error);

                    return undefined;
                }
            }),
            distinctUntilChanged(),
            cache()
        );
    }

    @Memoized
    private get currencyCode$(): Observable<string> {
        return this.format$.pipe(
            map((format) => format.currencyCode ?? "EUR"),
            distinctUntilChanged(),
            cache()
        );
    }

    @Memoized
    private get displayToken$(): Observable<string> {
        return this.format$.pipe(
            map((format) => format.displayToken ?? "symbol"),
            distinctUntilChanged(),
            cache()
        );
    }

    @Memoized
    protected get format$(): Observable<CurrencyFormat> {
        return this.formatSubject.pipe(
            map((format) => {
                if (format === undefined) {
                    return this.defaultFormat;
                }

                const structuredFormat = typeof format === "string" ? { digitsInfo: format } : format;

                return {
                    ...this.defaultFormat,
                    ...("currencyCode" in structuredFormat ? { currencyCode: structuredFormat.currencyCode } : {}),
                    ...("displayToken" in structuredFormat ? { displayToken: structuredFormat.displayToken } : {}),
                    ...("digitsInfo" in structuredFormat ? { digitsInfo: structuredFormat.digitsInfo } : {}),
                    ...("localeId" in structuredFormat ? { localeId: structuredFormat.localeId } : {}),
                    ...("useGroupingSeparator" in structuredFormat
                        ? { useGroupingSeparator: structuredFormat.useGroupingSeparator }
                        : {}),
                };
            }),
            distinctUntilChanged(),
            cache()
        );
    }
}
