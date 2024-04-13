import { TranslationParameters } from './translation-parameters.model';

export type TranslateFunction = (key: string, parameters?: TranslationParameters) => string;
