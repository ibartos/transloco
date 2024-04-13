/** Type of token that will be used a currency identifier. */
export enum AppCurrencyDisplayToken {
  /** The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, such as `USD` for the US dollar and `EUR` for the euro. */
  Code = 'code',

  /** The currency symbol / sign (such as `$` and `€`). */
  Symbol = 'symbol',

  /** Narrow currency symbol. E.g. the Canadian dollar CAD has the symbol `CA$` and the symbol-narrow is `$`. */
  SymbolNarrow = 'symbol-narrow',
}
