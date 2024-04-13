import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subject, Subscription, combineLatest, distinctUntilChanged, isObservable, map, of, switchMap } from 'rxjs';

import { TranslateStream } from '../../translations/translate.stream';

import { resolveUiText } from './resolve-ui-text';
import { UiText } from './ui-text.model';

type UiTextPipeInputValue = undefined | null | UiText | Observable<undefined | null | UiText>;

@Pipe({
  name: 'uiText',
  pure: false, // eslint-disable-line @angular-eslint/no-pipe-impure
  standalone: true,
})
export class UiTextPipe implements PipeTransform, OnDestroy {
  private subscription?: Subscription;
  private resolvedText = '';
  private readonly valueSubject = new Subject<UiTextPipeInputValue>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly translate$: TranslateStream,
  ) {}

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public transform(value: UiTextPipeInputValue): string {
    this.subscription ??= this.updateText();

    this.valueSubject.next(value);

    return this.resolvedText;
  }

  private updateText(): Subscription {
    const uiText$ = this.valueSubject.pipe(
      distinctUntilChanged(),
      switchMap((value) => (isObservable(value) ? value : of(value))),
      distinctUntilChanged(),
    );

    return combineLatest([
      uiText$,
      this.translate$,
    ])
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
        map(([uiText, translate]) => (uiText === null || uiText === undefined ? '' : resolveUiText(uiText, translate))),
        distinctUntilChanged(),
      )
      .subscribe((text) => {
        this.resolvedText = text;
        this.changeDetectorRef.markForCheck();
      });
  }
}
