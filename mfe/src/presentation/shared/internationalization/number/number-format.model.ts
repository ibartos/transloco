export interface NumberFormat {
  /**
   * Decimal representation options, specified by a string in the following format:
   * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`.
   *
   * @see {@link https://angular.io/api/common/DecimalPipe#digitsinfo}
   */
  digitsInfo?: string;

  /** Identifier of the locale that is to be used for the formatting. */
  localeId?: string;

  /** Whether the (thousands) grouping separator should be included. */
  useGroupingSeparator?: boolean;
}
