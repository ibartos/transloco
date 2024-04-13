import { RelativeDateTranslationGroup } from './relative-date-translation-group.interface';

/**
 * Map, key: string as locale indentifier.
 * E.g.
 * "en-US" : {
 *    sameDay: '[Today]'
 * }
 */
export type RelativeDateTranslations = Record<string, RelativeDateTranslationGroup>;
