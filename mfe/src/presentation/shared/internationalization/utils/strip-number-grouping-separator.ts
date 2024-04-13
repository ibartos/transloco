import { NumberSymbol, getLocaleNumberSymbol } from '@angular/common';

export function stripNumberGroupingSeparator(formattedNumber: string, localeId: string): string {
  const groupSeparatorSymbol = getLocaleNumberSymbol(localeId, NumberSymbol.Group);

  return formattedNumber.replaceAll(groupSeparatorSymbol, '');
}
