// App supported languages and locales
export const SUPPORTED_LANGUAGES = ["en-US", "ro-RO"];

// The default locale id of the app. Used when users locale can't be detected, and used as fallback language.
export const DEFAULT_LOCALE_ID = "en-US";

// A mapping from locale id's to labels. These labels are used in the select language drop down
export const LOCALE_NAMES = new Map<string, string>([
    ["en", "English"],
    ["ro", "Romana"],
]);

// Fallback locales when a locale id is not supported.
// This is used when autodetecting the users locale via the browser. It is not a fallback mechanism for translations.
// For example, en-XY would fallback to en-US, as fr-XY would fallback to fr-FR
export const LANGUAGE_DEFAULT_LOCALE_MAP = new Map<string, string>([
    ["en", "en-US"],
    ["ro", "ro-RO"],
]);
