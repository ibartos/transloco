import { TranslateFunction } from '../../translations/translate-function.model';
import { TranslationParameters } from '../../translations/translation-parameters.model';

import { UiText, isUiText } from './ui-text.model';

export function resolveUiText(text: UiText, translate: TranslateFunction): string;
export function resolveUiText(text: UiText | undefined, translate: TranslateFunction): string | undefined;
export function resolveUiText(text: UiText | undefined, translate: TranslateFunction): string | undefined {
  return typeof text !== 'object' ? text : translate(text.key, resolveUiTextParameters(text.parameters, translate));
}

function resolveUiTextParameters(
  translationParameters: TranslationParameters | undefined,
  translate: TranslateFunction,
): TranslationParameters | undefined {
  if (!translationParameters) {
    return undefined;
  }

  return Object.fromEntries(
    // eslint-disable-next-line wrap-iife
    (function* (): Iterable<[string, unknown]> {
      for (const [key, value] of Object.entries(translationParameters)) {
        yield [key, isUiText(value) ? resolveUiText(value, translate) : value];
      }
    })(),
  );
}
