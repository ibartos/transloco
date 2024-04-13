import { hasProperty } from "../../utils";

export type StandardDateTimeFormat = string | StandardDateTimeFormatSpecification;

export type PartialStandardDateTimeFormat = string | Partial<StandardDateTimeFormatSpecification>;

export type StandardDateTimeFormatSpecification = ({ format: string } | { formatKey: string }) & {
    localeId?: string;
};

export function isStandardDateTimeFormat(value: unknown): value is StandardDateTimeFormat {
    return typeof value === "string" || isStandardDateTimeFormatSpecification(value);
}

export function isStandardDateTimeFormatSpecification(value: unknown): value is StandardDateTimeFormatSpecification {
    return (
        isPartialStandardDateTimeFormatSpecification(value) &&
        (hasProperty(value, "format") || hasProperty(value, "formatKey"))
    );
}

export function isPartialStandardDateTimeFormat(value: unknown): value is PartialStandardDateTimeFormat {
    return typeof value === "string" || isPartialStandardDateTimeFormatSpecification(value);
}

export function isPartialStandardDateTimeFormatSpecification(value: unknown): value is PartialStandardDateTimeFormat {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        (!hasProperty(value, "format") || typeof value.format === "string") &&
        (!hasProperty(value, "formatKey") || typeof value.formatKey === "string") &&
        !(hasProperty(value, "format") && hasProperty(value, "formatKey")) &&
        (!hasProperty(value, "localeId") || typeof value.localeId === "string")
    );
}
