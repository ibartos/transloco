import { AdaptedDateTime } from './adapted-date-time.model';

export abstract class DateTimeAdapter<DateTimeType> {
  public abstract supports(dateTime: unknown): dateTime is DateTimeType;

  public abstract convert<OtherDateTimeType>(adaptedOtherDateTime: AdaptedDateTime<OtherDateTimeType>): DateTimeType;

  public abstract convert<OtherDateTimeType>(
    otherDateTime: OtherDateTimeType,
    otherDateTimeAdapter: DateTimeAdapter<OtherDateTimeType>,
  ): DateTimeType;

  public abstract adapt(dateTime: DateTimeType): AdaptedDateTime<DateTimeType>;
}
