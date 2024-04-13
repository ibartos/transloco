import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';

import { APP_DEFAULT_LOCALE_ID } from './default-locale-id.token';
import { AppLocaleService } from './locale/locale.service';

export const APP_LOCALE_ID_STORAGE_KEY = new InjectionToken<string>('APP_LOCALE_ID_STORAGE_KEY');

@Injectable()
export class AppLocaleIdPersistenceService implements OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly localeService: AppLocaleService,
    @Inject(APP_LOCALE_ID_STORAGE_KEY) @Optional() private readonly localeIdStorageKey: string | null,
    @Inject(APP_DEFAULT_LOCALE_ID) @Optional() private readonly defaultLocaleId: string | null,
  ) {
    this.setInitialLocaleId();

    this.subscriptions.add(this.storeLocaleIdOnChange());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setInitialLocaleId(): void {
    const initialLocaleId = (this.localeIdStorageKey ? localStorage.getItem(this.localeIdStorageKey) : undefined) ?? this.defaultLocaleId;

    if (typeof initialLocaleId === 'string') {
      this.localeService.setLocale(initialLocaleId);
    }
  }

  private storeLocaleIdOnChange(): Subscription {
    const localeIdStorageKey = this.localeIdStorageKey;

    if (!localeIdStorageKey) {
      return new Subscription();
    }

    return this.localeService.selectedLocaleId$.subscribe((localeId) => {
      localStorage.setItem(localeIdStorageKey, localeId);
    });
  }
}
