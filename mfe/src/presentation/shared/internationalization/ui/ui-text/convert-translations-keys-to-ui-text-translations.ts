import { Translation } from '../../translations/translation.model';

import { UiTextTranslations } from './ui-text-translations';

export function convertTranslationKeysToUiTextTranslations<T extends Translation>(translationKeys: T): UiTextTranslations<T> {
  return Array.from(Object.entries(translationKeys)).reduce(
    (uiTextTranslations, [key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      uiTextTranslations[key as keyof T] =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof value === 'string' ? { key: value } : (convertTranslationKeysToUiTextTranslations(value) as any);

      return uiTextTranslations;
    },
    {} as UiTextTranslations<T>, // eslint-disable-line @typescript-eslint/prefer-reduce-type-parameter
  );
}
