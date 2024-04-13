import { Injectable } from '@angular/core';

import { NativeDateTimeAdapter } from './native-date-time-adapter';
import { ProxyDateTimeAdapter } from './proxy-date-time-adapter';

@Injectable({ providedIn: 'root' })
export class EpochTimeDateTimeAdapter extends ProxyDateTimeAdapter<number, Date> {
  constructor(
    protected readonly proxyDateTimeAdapter: NativeDateTimeAdapter,
  ) {
    super();
  }

  public supports(dateTime: unknown): dateTime is number {
    return typeof dateTime === 'number';
  }

  protected convertToProxyDateTime(dateTime: number): Date {
    return new Date(dateTime);
  }

  protected convertFromProxyDateTime(proxyDateTime: Date): number {
    return proxyDateTime.getTime();
  }
}
