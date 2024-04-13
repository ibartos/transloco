import { Injectable } from '@angular/core';

import { NativeDateTimeAdapter } from './native-date-time-adapter';
import { ProxyDateTimeAdapter } from './proxy-date-time-adapter';

@Injectable({ providedIn: 'root' })
export class IsoStringTimeDateTimeAdapter extends ProxyDateTimeAdapter<string, Date> {
  constructor(
    protected readonly proxyDateTimeAdapter: NativeDateTimeAdapter,
  ) {
    super();
  }

  public supports(dateTime: unknown): dateTime is string {
    return typeof dateTime === 'string';
  }

  protected convertToProxyDateTime(dateTime: string): Date {
    return new Date(dateTime);
  }

  protected convertFromProxyDateTime(proxyDateTime: Date): string {
    return proxyDateTime.toISOString();
  }
}
