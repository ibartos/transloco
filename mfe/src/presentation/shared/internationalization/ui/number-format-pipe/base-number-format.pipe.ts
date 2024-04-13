import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from "@angular/core";

import { distinctUntilChanged, filter, map, Observable, of, ReplaySubject, Subscription, switchMap } from "rxjs";

import { AppLocaleIdStream } from "../../locale/locale-id.stream";
import { NumberFormat } from "../../number/number-format.model";

import { AppNumberFormatPipeError } from "./number-format-pipe-error.model";
import { cache, Memoized, notUndefined } from "../../../utils";

@Pipe({
    name: "baseNumberFormat",
    pure: false, // eslint-disable-line @angular-eslint/no-pipe-impure
    standalone: true,
})
export abstract class AppBaseNumberFormatPipe<FormatType extends NumberFormat, FormatInputType>
    implements OnDestroy, PipeTransform
{
    protected readonly formatSubject = new ReplaySubject<FormatInputType | undefined>(1);

    private lastFormattedValue: string | undefined;

    private readonly valueSubject = new ReplaySubject<number | string | null | undefined>(1);
    private readonly subscriptions = new Subscription();

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly defaultLocaleId$: AppLocaleIdStream
    ) {
        this.subscriptions.add(this.formatValue());
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public transform(value: number | string | null | undefined, format?: FormatInputType): string | undefined {
        this.valueSubject.next(value);
        this.formatSubject.next(format);

        return this.lastFormattedValue;
    }

    protected reportError(message: string, cause?: unknown): void {
        const error = new AppNumberFormatPipeError(this.pipeName, message, cause);

        queueMicrotask(() => {
            throw error;
        });
    }

    @Memoized
    protected get value$(): Observable<number | undefined> {
        return this.valueSubject.pipe(
            map((value) => {
                if (value === null || value === undefined || value === "") {
                    return undefined;
                }

                if (typeof value === "string") {
                    const parsedValue = Number(value.trim());

                    if (isNaN(parsedValue)) {
                        this.reportError("Failed to parse input value of type string", `"${value}" is not a number`);

                        return undefined;
                    }

                    return parsedValue;
                }

                return value;
            }),
            distinctUntilChanged(),
            cache()
        );
    }

    @Memoized
    protected get digitsInfo$(): Observable<string | undefined> {
        return this.format$.pipe(
            map((format) => format.digitsInfo),
            distinctUntilChanged(),
            cache()
        );
    }

    @Memoized
    protected get localeId$(): Observable<string> {
        return this.format$.pipe(
            switchMap((format) => (format.localeId !== undefined ? of(format.localeId) : this.defaultLocaleId$)),
            filter(notUndefined),
            distinctUntilChanged(),
            cache()
        );
    }

    @Memoized
    protected get useGroupingSeparator$(): Observable<boolean> {
        return this.format$.pipe(
            map((format) => format.useGroupingSeparator ?? false),
            distinctUntilChanged(),
            cache()
        );
    }

    protected get pipeName(): string {
        return (this as { constuctor?: Function }).constructor.name; // eslint-disable-line @typescript-eslint/ban-types
    }

    protected abstract get format$(): Observable<FormatType>;

    protected abstract get formattedValue$(): Observable<string | undefined>;

    private formatValue(): Subscription {
        return this.formattedValue$.subscribe((formattedValue) => {
            this.lastFormattedValue = formattedValue;
            this.changeDetectorRef.markForCheck();
        });
    }
}
