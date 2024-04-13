import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

import { combineLatest, filter, map, Observable, of } from "rxjs";

import { AppLocaleService } from "../locale/locale.service";
import { TranslateStream } from "../translations/translate.stream";

import { DateTimeFormatterResolver } from "./date-time-formatter-resolver.model";
import { DateTimeFormatter } from "./date-time-formatter.model";
import { NativeDateTimeAdapter } from "./native-date-time-adapter";
import {
    isPartialStandardDateTimeFormat,
    isStandardDateTimeFormat,
    PartialStandardDateTimeFormat,
    StandardDateTimeFormat,
} from "./standard-date-time-format.model";
import { notUndefined } from "../../utils";

@Injectable()
export class StandardDateTimeFormatterResolver
    implements DateTimeFormatterResolver<Date, StandardDateTimeFormat, PartialStandardDateTimeFormat>
{
    constructor(
        public readonly adapter: NativeDateTimeAdapter,
        private readonly translate$: TranslateStream,
        private readonly localeService: AppLocaleService
    ) {}

    public supportsFormat(format: unknown): format is StandardDateTimeFormat {
        return isStandardDateTimeFormat(format);
    }

    public supportsPartialFormat(format: unknown): format is PartialStandardDateTimeFormat {
        return isPartialStandardDateTimeFormat(format);
    }

    public merge(
        baseFormat: StandardDateTimeFormat,
        partialFormat: PartialStandardDateTimeFormat
    ): StandardDateTimeFormat {
        const localeId =
            (typeof partialFormat === "string" ? undefined : partialFormat.localeId) ??
            (typeof baseFormat === "string" ? undefined : baseFormat.localeId);

        const formatSpecification =
            typeof partialFormat === "string"
                ? { format: partialFormat }
                : "format" in partialFormat && partialFormat.format !== undefined
                  ? { format: partialFormat.format }
                  : "formatKey" in partialFormat && partialFormat.formatKey !== undefined
                    ? { formatKey: partialFormat.formatKey }
                    : typeof baseFormat === "string"
                      ? { format: baseFormat }
                      : "format" in baseFormat
                        ? { format: baseFormat.format }
                        : { formatKey: baseFormat.formatKey };

        return {
            ...formatSpecification,
            ...(localeId ? { localeId } : {}),
        };
    }

    public resolve(dateTimeFormatSpecification: StandardDateTimeFormat): Observable<DateTimeFormatter<Date>> {
        const { format, formatKey, localeId } =
            typeof dateTimeFormatSpecification === "string"
                ? { format: dateTimeFormatSpecification, formatKey: undefined, localeId: undefined }
                : { format: undefined, formatKey: undefined, ...dateTimeFormatSpecification };

        const format$ =
            formatKey === undefined ? of(format) : this.translate$.pipe(map((translate) => translate(formatKey)));

        const localeId$ =
            localeId !== undefined
                ? this.localeService.loadLocale(localeId).pipe(map(() => localeId))
                : this.localeService.activeLocaleId$.pipe(filter(notUndefined));

        return createFormatterStream(format$, localeId$);
    }
}

function createFormatterStream(
    format$: Observable<string>,
    localeId$: Observable<string>
): Observable<DateTimeFormatter<Date>> {
    return combineLatest([format$, localeId$]).pipe(map(([format, localeId]) => createFormatter(format, localeId)));
}

function createFormatter(format: string, localeId: string): DateTimeFormatter<Date> {
    return (date: Date) => formatDate(date, format, localeId);
}
