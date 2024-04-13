/**
 * These formats depend on the used date-time library.
 *
 * For Moment.js:
 * Match format as in {@link https://momentjs.com/docs/#/displaying/calendar-time/}
 * Values between [] are parsed as string by moment js.
 * Values outside of brackets are parsed as date formatting symbols {@link https://momentjs.com/docs/#/displaying/format/}
 */
export interface RelativeDateTranslationGroup {
  sameDay?: string;
  lastDay?: string;
  lastWeek?: string;
  nextDay?: string;
  nextWeek?: string;
  /** Any date other than specified */
  other?: string;

  /**
   * Regular date display, used when no relative formats are specified
   * or when bolDatepickerInput.disableRelativeDates = true
   * will default to default material formats in BOL_DEFAULT_FORMATS if not specified
   */
  dateInputDisplay?: string;
  /**
   * Format used for parsing in the bolDatepickerInput
   * will default to default material formats in BOL_DEFAULT_FORMATS if not specified
   */
  dateInputParse?: string;
}
