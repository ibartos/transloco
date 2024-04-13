import { AdaptedDateTime, DateComponents, EpochComponent, TimeComponents } from './adapted-date-time.model';
import { DateTimeAdapter } from './date-time-adapter.model';

export abstract class ProxyDateTimeAdapter<DateTimeType, ProxyDateTimeType> extends DateTimeAdapter<DateTimeType> {
  protected abstract readonly proxyDateTimeAdapter: DateTimeAdapter<ProxyDateTimeType>;

  public convert<OtherDateTimeType>(
    otherDateTime: OtherDateTimeType | AdaptedDateTime<OtherDateTimeType>,
    otherDateTimeAdapter?: DateTimeAdapter<OtherDateTimeType>,
  ): DateTimeType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    return this.convertFromProxyDateTime(this.proxyDateTimeAdapter.convert(otherDateTime, otherDateTimeAdapter as any));
  }

  public adapt(dateTime: DateTimeType): AdaptedDateTime<DateTimeType> {
    return new AdaptedProxyDateTime(
      this.proxyDateTimeAdapter.adapt(this.convertToProxyDateTime(dateTime)),
      this.convertFromProxyDateTime.bind(this),
    );
  }

  protected abstract convertToProxyDateTime(dateTime: DateTimeType): ProxyDateTimeType;

  protected abstract convertFromProxyDateTime(proxyDateTime: ProxyDateTimeType): DateTimeType;
}

export class AdaptedProxyDateTime<DateTimeType, ProxyDateTimeType> extends AdaptedDateTime<DateTimeType> {
  public readonly year?: () => number;
  public readonly month?: () => number;
  public readonly day?: () => number;
  public readonly hour?: () => number;
  public readonly minute?: () => number;
  public readonly second?: () => number;
  public readonly millisecond?: () => number;
  public readonly epochTime?: () => number;

  constructor(
    private readonly proxy: AdaptedDateTime<ProxyDateTimeType>,
    private readonly convertFromProxyDateTime: (proxyDateTime: ProxyDateTimeType) => DateTimeType,
  ) {
    super();
    if (proxy.has('date')) {
      this.year = proxy.year.bind(proxy);
      this.month = proxy.month.bind(proxy);
      this.day = proxy.day.bind(proxy);
    }
    if (proxy.has('time')) {
      this.hour = proxy.hour.bind(proxy);
      this.minute = proxy.minute.bind(proxy);
      this.second = proxy.second.bind(proxy);
      this.millisecond = proxy.millisecond.bind(proxy);
    }
    if (proxy.has('epoch')) {
      this.epochTime = proxy.epochTime.bind(proxy);
    }
  }

  public has(componentType: 'date'): this is Exclude<this, keyof DateComponents> & DateComponents;
  public has(componentType: 'time'): this is Exclude<this, keyof TimeComponents> & TimeComponents;
  public has(componentType: 'epoch'): this is Exclude<this, 'epochTime'> & EpochComponent;
  public has(componentType: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    return this.proxy.has(componentType as any);
  }

  public get(): DateTimeType {
    return this.convertFromProxyDateTime(this.proxy.get());
  }

  public isValid(): boolean {
    return this.proxy.isValid();
  }
}
