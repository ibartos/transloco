import { ChangeDetectorRef, Inject, isDevMode, OnDestroy, Pipe, PipeTransform } from "@angular/core";

import {
    combineLatest,
    distinctUntilChanged,
    map,
    Observable,
    of,
    ReplaySubject,
    startWith,
    Subscription,
    switchMap,
} from "rxjs";

import { DateTimeConverterService } from "../../temporal/date-time-converter.service";
import { DateTimeFormatterResolver } from "../../temporal/date-time-formatter-resolver.model";
import { DATE_TIME_FORMATTER_RESOLVER } from "../../temporal/date-time-formatter-resolver.token";
import { DateTimeFormatter } from "../../temporal/date-time-formatter.model";

import { AppBaseDateTimeFormatPipeError } from "./base-date-time-format-pipe-error.model";
import { cache, Memoized } from "../../../utils";

@Pipe({
    name: "baseDateTimeFormat",
    pure: false, // eslint-disable-line @angular-eslint/no-pipe-impure
})
export abstract class AppBaseDateTimeFormatPipe implements OnDestroy, PipeTransform {
    private lastFormattedDateTimeValue = "";

    private readonly dateTimeValueSubject = new ReplaySubject<unknown>(1);
    private readonly dateTimeFormatSubject = new ReplaySubject<unknown>(1);
    private readonly emptyValueSubject = new ReplaySubject<string>(1);
    private readonly subscriptions = new Subscription();
    private readonly defaultFormat: unknown;

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        @Inject(DATE_TIME_FORMATTER_RESOLVER)
        private readonly dateTimeFormatterResolver: DateTimeFormatterResolver<unknown, unknown, unknown>,
        private readonly dateTimeConverter: DateTimeConverterService
    ) {
        this.defaultFormat = this.getDefaultFormat();
        this.initialize();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public transform(dateTime: unknown, format?: unknown, emptyValue?: string | null): string {
        this.dateTimeValueSubject.next(dateTime);
        this.dateTimeFormatSubject.next(format);
        this.emptyValueSubject.next(emptyValue ?? "");

        return this.lastFormattedDateTimeValue;
    }

    protected abstract getDefaultFormat(): unknown;

    private initialize(): void {
        if (this.dateTimeFormatterResolver.supportsFormat(this.defaultFormat)) {
            this.subscriptions.add(this.formatValue());
        } else {
            reportError(
                "provided default format",
                this.defaultFormat,
                "is not supported by",
                this.dateTimeFormatterResolver
            );
        }
    }

    private formatValue(): Subscription {
        return this.formattedDateTimeValue$.subscribe((formattedDateTimeValue) => {
            this.lastFormattedDateTimeValue = formattedDateTimeValue;
            this.changeDetectorRef.markForCheck();
        });
    }

    @Memoized
    private get formattedDateTimeValue$(): Observable<string> {
        return combineLatest([
            this.dateTimeValueSubject.pipe(distinctUntilChanged()),
            this.emptyValueSubject.pipe(distinctUntilChanged()),
            this.formatter$.pipe(startWith(undefined)),
        ]).pipe(
            map(([dateTimeValue, emptyValue, formatDateTime]) => {
                // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
                if (!formatDateTime || dateTimeValue === null || dateTimeValue === undefined) {
                    return emptyValue;
                }

                const adaptedDateTimeValue = this.dateTimeFormatterResolver.adapter.supports(dateTimeValue)
                    ? dateTimeValue
                    : this.dateTimeConverter.convert(dateTimeValue, this.dateTimeFormatterResolver.adapter);

                if (adaptedDateTimeValue === undefined) {
                    reportError("no compatible DateTimeAdapter found for value", dateTimeValue);

                    return emptyValue;
                }

                return formatDateTime(adaptedDateTimeValue);
            })
        );
    }

    @Memoized
    private get formatter$(): Observable<DateTimeFormatter<unknown> | undefined> {
        return this.dateTimeFormatSubject.pipe(
            distinctUntilChanged(),
            switchMap((dateTimeFormat) => {
                const isUnspecifiedDateTimeFormat = dateTimeFormat === null || dateTimeFormat === undefined;
                if (
                    !isUnspecifiedDateTimeFormat &&
                    !this.dateTimeFormatterResolver.supportsPartialFormat(dateTimeFormat)
                ) {
                    reportError(
                        "provided input format",
                        dateTimeFormat,
                        "is not supported by",
                        this.dateTimeFormatterResolver
                    );

                    return of(undefined);
                }

                const dateTimeFormatToResolve = isUnspecifiedDateTimeFormat
                    ? this.defaultFormat
                    : this.dateTimeFormatterResolver.merge(this.defaultFormat, dateTimeFormat);

                return this.dateTimeFormatterResolver.resolve(dateTimeFormatToResolve);
            }),
            cache()
        );
    }
}

function reportError(...message: unknown[]): void {
    if (isDevMode()) {
        console.warn("AppBaseDateTimeFormatPipeError:", ...message); // eslint-disable-line no-console
    }
    const error = new AppBaseDateTimeFormatPipeError(createErrorMessage(message));

    queueMicrotask(() => {
        throw error;
    });
}

function createErrorMessage(...messageSegments: unknown[]): string {
    return messageSegments
        .map((segment) => {
            if (typeof segment === "string") {
                return segment;
            }

            const stringifiedValue = String(segment);

            if (stringifiedValue !== String({})) {
                return stringifiedValue;
            }

            try {
                return (Object.getPrototypeOf(segment) as { constructor: { name: string } }).constructor.name;
            } catch {
                return "(unknown)";
            }
        })
        .join(" ");
}
