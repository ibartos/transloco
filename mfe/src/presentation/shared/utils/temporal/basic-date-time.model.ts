import { BasicDate, isBasicDate, isSameBasicDate, isValidBasicDate } from './basic-date.model';
import { BasicTime, isBasicTime, isSameBasicTime, isValidBasicTime } from './basic-time.model';

/** Interface to represent just the components of a date+time (year, month, day, hour, minute, second, millisecond). */
export interface BasicDateTime extends BasicDate, BasicTime {}

export function isBasicDateTime(value: unknown): value is BasicDateTime {
  return isBasicDate(value) && isBasicTime(value);
}

export function isValidBasicDateTime(dateTime: BasicDateTime): boolean {
  return isValidBasicDate(dateTime) && isValidBasicTime(dateTime);
}

export function isSameBasicDateTime(first: BasicDateTime, second: BasicDateTime): boolean {
  return isSameBasicDate(first, second) && isSameBasicTime(first, second);
}
