import { formatPercent } from "@angular/common";
import { ChangeDetectorRef, Inject, Pipe, PipeTransform } from "@angular/core";

import { combineLatest, distinctUntilChanged, map, Observable } from "rxjs";

import { AppLocaleIdStream } from "../../locale/locale-id.stream";
import { APP_DEFAULT_PERCENT_FORMAT } from "../../number/default-percent-format.token";
import { NumberFormat } from "../../number/number-format.model";
import { stripNumberGroupingSeparator } from "../../utils/strip-number-grouping-separator";
import { AppBaseNumberFormatPipe } from "../number-format-pipe/base-number-format.pipe";
import { cache, Memoized } from "../../../utils";

@Pipe({
    name: "percent",
    pure: false, // eslint-disable-line @angular-eslint/no-pipe-impure
    standalone: true,
})
export class AppPercentFormatPipe
    extends AppBaseNumberFormatPipe<NumberFormat, string | NumberFormat>
    implements PipeTransform
{
    constructor(
        @Inject(APP_DEFAULT_PERCENT_FORMAT) private readonly defaultFormat: NumberFormat,
        changeDetectorRef: ChangeDetectorRef,
        defaultLocaleId$: AppLocaleIdStream
    ) {
        super(changeDetectorRef, defaultLocaleId$);
    }

    @Memoized
    protected get formattedValue$(): Observable<string | undefined> {
        return combineLatest([this.value$, this.digitsInfo$, this.localeId$, this.useGroupingSeparator$]).pipe(
            map(([value, digitsInfo, localeId, useGroupingSeparator]) => {
                if (value === undefined) {
                    return undefined;
                }

                try {
                    const formattedNumber = formatPercent(value, localeId, digitsInfo);

                    return useGroupingSeparator
                        ? formattedNumber
                        : stripNumberGroupingSeparator(formattedNumber, localeId);
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
    protected get format$(): Observable<NumberFormat> {
        return this.formatSubject.pipe(
            distinctUntilChanged(),
            map((format) => {
                if (format === undefined) {
                    return this.defaultFormat;
                }

                const structuredFormat = typeof format === "string" ? { digitsInfo: format } : format;

                return {
                    ...this.defaultFormat,
                    ...("digitsInfo" in structuredFormat ? { digitsInfo: structuredFormat.digitsInfo } : {}),
                    ...("localeId" in structuredFormat ? { localeId: structuredFormat.localeId } : {}),
                    ...("useGroupingSeparator" in structuredFormat
                        ? { useGroupingSeparator: structuredFormat.useGroupingSeparator }
                        : {}),
                };
            }),
            cache()
        );
    }
}
