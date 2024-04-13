import { TranslationParameters } from "../../translations/translation-parameters.model";
import { arraySetEquals } from "../../../utils";

export type UiText = LiteralUiText | TranslatableUiText;

export type LiteralUiText = string;

export interface TranslatableUiText {
    key: string;
    parameters?: TranslationParameters;
}

export function isUiText(value: unknown): value is UiText {
    return (
        typeof value === "string" ||
        (hasProperty(value, "key") &&
            typeof value.key === "string" &&
            (!hasProperty(value, "parameters") ||
                (typeof value.parameters === "object" && value.parameters !== null) ||
                value.parameters === undefined))
    );
}

function hasProperty<S, T extends string>(subject: S, key: T): subject is S & { [k in T]: unknown } {
    return typeof subject === "object" && subject !== null && key in subject;
}

export function isSameUiText(first: UiText, second: UiText): boolean {
    return (
        first === second ||
        (typeof first === "object" &&
            typeof second === "object" &&
            first.key === second.key &&
            isSameTranslationParameters(first.parameters ?? {}, second.parameters ?? {}))
    );
}

function isSameTranslationParameters(first: TranslationParameters, second: TranslationParameters): boolean {
    return (
        first === second ||
        arraySetEquals(Object.entries(first), Object.entries(second), {
            equals: ([firstKey, firstValue], [secondKey, secondValue]) =>
                firstKey === secondKey &&
                (firstValue === secondValue ||
                    (isUiText(firstValue) && isUiText(secondValue) && isSameUiText(firstValue, secondValue))),
        })
    );
}
