import { AppCurrencyDisplayToken } from './currency-display-token.enum';

export interface CurrencyFormat {
  /**
   * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, e.g. `USD` or `EUR`.
   */
  currencyCode?: string;

  /**
   * Token used as identifier for the currency. Should be one of the following:
   * - `code`: Show the code (such as `USD`).
   * - `symbol` (default): Show the symbol (such as `$`).
   * - `symbol-narrow`: Use the narrow symbol for locales that have two symbols for their currency.
   * - Any other string value will be used a literal currency token.
   */
  displayToken?: AppCurrencyDisplayToken | string;

  /**
   * Decimal representation options, specified by a string in the following format:
   * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`.
   *
   * @see {@link https://angular.io/api/common/DecimalPipe#digitsinfo}
   *
   * If not provided, the number will be formatted with the proper amount of digits, depending on what the ISO 4217 specifies for the
   * currency.
   */
  digitsInfo?: string;

  /** Identifier of the locale that is to be used for the formatting. */
  localeId?: string;

  /** Whether the (thousands) grouping separator should be included. */
  useGroupingSeparator?: boolean;
}
