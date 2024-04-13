import { MILLISECONDS_PER_DAY, MILLISECONDS_PER_HOUR, MILLISECONDS_PER_MINUTE, MILLISECONDS_PER_SECOND } from './temporal-constants';

/** Interface to represent just the components of a duration (milliseconds, seconds, minutes, hours, days). */
export interface BasicDuration {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
}

/**
 * Converts a `BasicDuration` object to the total number of milliseconds represented by that duration.
 *
 * @param duration The `BasicDuration` for which the total number of milliseconds is to be computed.
 * @returns        Number of milliseconds represented by the given duration.
 */
export function basicDurationToMilliseconds(duration: BasicDuration): number {
  const { milliseconds, seconds, minutes, hours, days } = duration;

  return (
    (days ?? 0) * MILLISECONDS_PER_DAY +
    (hours ?? 0) * MILLISECONDS_PER_HOUR +
    (minutes ?? 0) * MILLISECONDS_PER_MINUTE +
    (seconds ?? 0) * MILLISECONDS_PER_SECOND +
    (milliseconds ?? 0)
  );
}

const BASIC_DURATION_UNIT_LENGTH_IN_MILLISECONDS: Record<keyof BasicDuration, number> = {
  days: MILLISECONDS_PER_DAY,
  hours: MILLISECONDS_PER_HOUR,
  minutes: MILLISECONDS_PER_MINUTE,
  seconds: MILLISECONDS_PER_SECOND,
  milliseconds: 1,
};

/**
 * Converts the specified number of milliseconds to a `BasicDuration` object. The resulting object will only contain properties for the
 * non-zero units. For example: `{ hours: 2, seconds: 18 }` instead of `{ days: 0, hours: 2, minutes: 0, seconds: 18, milliseconds: 0 }`.
 *
 * This function takes the absolute value of the `milliseconds` parameter, so negative values are not reflected in the output.
 *
 * @param milliseconds Number of milliseconds representing to duration that is to be converted to a `BasicDuration` object.
 * @returns            A `BasicDuration` object that reflects the specified number of milliseconds.
 */
export function millisecondsToBasicDuration(milliseconds: number): BasicDuration {
  const duration: BasicDuration = {};
  let millisecondsRemaining = Math.abs(milliseconds);

  for (const [unit, millisecondsPerUnit] of Object.entries(BASIC_DURATION_UNIT_LENGTH_IN_MILLISECONDS)) {
    const amount = Math.floor(millisecondsRemaining / millisecondsPerUnit);

    if (amount > 0) {
      duration[unit as keyof BasicDuration] = amount;
    }

    millisecondsRemaining -= amount * millisecondsPerUnit;
  }

  return duration;
}
