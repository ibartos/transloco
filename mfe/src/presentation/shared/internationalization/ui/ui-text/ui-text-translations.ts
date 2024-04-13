import { Translation } from '../../translations/translation.model';

import { UiText } from './ui-text.model';

export type UiTextTranslations<T extends Translation> = {
  [P in keyof T]: T[P] extends Translation ? UiTextTranslations<T[P]> : UiText;
};
