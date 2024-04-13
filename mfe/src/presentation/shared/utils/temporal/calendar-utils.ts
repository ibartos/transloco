import { BasicDate } from './basic-date.model';

/**
 * Computes the number of days in the specified month.
 *
 * @param month Month for which the number of days are to be determined (ranges from 1 to 12).
 * @param year  Year of the month for which the number of days is to be calculated.
 * @returns     Length of the specified month in number of days.
 */
export function daysInMonth(month: number, year: number): number;

/**
 * Computes the number of days in the month of the specified date.
 *
 * @param date Date for which the month length is to be determined.
 * @returns    Length of the month for the specified date.
 */
export function daysInMonth(date: Pick<BasicDate, 'year' | 'month'>): number;

export function daysInMonth(monthOrDate: number | Pick<BasicDate, 'year' | 'month'>, yearOrUndefined?: number): number {
  const isDate = typeof monthOrDate === 'object';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const year = isDate ? monthOrDate.year : yearOrUndefined!;
  const month = isDate ? monthOrDate.month : monthOrDate;

  return month === 2 ? (isLeapYear(year) ? 29 : 28) : 31 - (((month - 1) % 7) % 2);
}

/**
 * Checks whether the specified year is a leap year.
 *
 * @returns `true` if the specified year is leap year, `false` if not.
 */
export function isLeapYear(year: number): boolean;

/**
 * Checks whether the specified date lies within a leap year.
 *
 * @returns `true` if the specified date lies within a leap year, `false` if not.
 */
export function isLeapYear(date: Pick<BasicDate, 'year'>): boolean;

export function isLeapYear(yearOrDate: number | Pick<BasicDate, 'year'>): boolean {
  const year = typeof yearOrDate === 'number' ? yearOrDate : yearOrDate.year;

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
