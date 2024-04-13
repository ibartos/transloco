import { Observable } from 'rxjs';

import { RelativeDateTranslationGroup } from './relative-date-translation-group.interface';

export abstract class RelativeDateTranslationLoader {
  public abstract loadTranslation(locale: string): Observable<RelativeDateTranslationGroup>;
}
