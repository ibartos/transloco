import { defineTranslation } from "../../presentation/shared/internationalization";
import { CORE_TRANSLATION_KEYS } from "../../presentation/core/core-translation-keys";

export default defineTranslation(CORE_TRANSLATION_KEYS, {
    HEADER: {
        TITLE: "SPORTSBOOK",
        SUB_CAPTION: "caption",
        HOME: "Home",
    },
    DATE_TIME: {
        YESTERDAY: "Yesterday",
        TODAY: "Today",
        TOMORROW: "Tomorrow",
        FORMATS: {
            DAY: "d",
            DAY_MONTH: "MMM d",
            DAY_MONTH_YEAR: "MMM dd, yyyy",
            FULL_HOUR_MINUTE: "hh:mm a",
            FULL_WEEKDAY: "cccc",
            FULL_WEEKDAY_DAY_MONTH: "cccc, MMM d",
            FULL_WEEKDAY_FULL_DAY_MONTH: "cccc, MMMM d",
            HOUR: "h a",
            HOUR_COMPACT: "ha",
            HOUR_MINUTE: "h:mm a",
            HOUR_MINUTE_SECOND: "h:mm:ss a",
            MONTH_DAY: "MMM d,",
            WEEKDAY: "ccc",
            WEEKDAY_DAY: "ccc d",
            WEEKDAY_DAY_MONTH: "ccc, MMM dd",
            WEEKDAY_DAY_MONTH_YEAR: "ccc MMM dd, yyyy",
            WEEKDAY_WITH_SEPARATOR: "ccc,",
            YEAR: "yyyy",
        },
    },
});
