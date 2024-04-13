import { ApplicationRef, InjectFlags, Injector } from '@angular/core';

export function isRootInjector(injector: Injector): boolean {
  // eslint-disable-next-line no-bitwise
  const parentInjector = injector.get<Injector | undefined>(Injector, undefined, InjectFlags.SkipSelf | InjectFlags.Optional);

  if (!parentInjector) {
    return false;
  }

  const injectorHasApplicationRef = !!injector.get<ApplicationRef | undefined>(ApplicationRef, undefined, InjectFlags.Optional);
  const parentInjectorHasApplicationRef = !!parentInjector.get(ApplicationRef, undefined, InjectFlags.Optional);

  return injectorHasApplicationRef && !parentInjectorHasApplicationRef;
}
