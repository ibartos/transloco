import { defineTranslationKeys } from "../shared/internationalization";

// eslint-disable-next-line id-length
export const CORE_TRANSLATION_KEYS = defineTranslationKeys((t) => ({
    HEADER: {
        TITLE: t,
        SUB_CAPTION: t,
        HOME: t,
    },
    DATE_TIME: {
        YESTERDAY: t,
        TODAY: t,
        TOMORROW: t,
        FORMATS: {
            DAY: t,
            DAY_MONTH: t,
            DAY_MONTH_YEAR: t,
            FULL_HOUR_MINUTE: t,
            FULL_WEEKDAY: t,
            FULL_WEEKDAY_DAY_MONTH: t,
            FULL_WEEKDAY_FULL_DAY_MONTH: t,
            HOUR: t,
            HOUR_COMPACT: t,
            HOUR_MINUTE: t,
            HOUR_MINUTE_SECOND: t,
            MONTH_DAY: t,
            WEEKDAY: t,
            WEEKDAY_DAY: t,
            WEEKDAY_DAY_MONTH: t,
            WEEKDAY_DAY_MONTH_YEAR: t,
            WEEKDAY_WITH_SEPARATOR: t,
            YEAR: t,
        },
    },
}));
