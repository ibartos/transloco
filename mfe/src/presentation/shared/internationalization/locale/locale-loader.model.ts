import { Provider } from '@angular/core';
import { UnboundProvider, bindProvider } from 'ngx-inject';
import { Observable } from 'rxjs';

/**
 * Interface for objects that are capable of loading locale dependent resources.
 */
export abstract class AppLocaleLoader {
  /**
   * Loads the resources for locale with the specified identifier. Should return an observable that terminates with a complete (or error)
   * event when the resources were loaded (or failed to load). Emits on the next channel are ignored.
   */
  public abstract loadLocale(localeId: string): Observable<void>;
}

/**
 * Creates a `Provider` that is used to register the specified locale loader. This provider should be added to the providers array of the
 * root module (usually called `AppModule`) or a module that is (transitively) imported in the root module.
 *
 * @param localeLoader Definition of how to resolve the `AppLocaleLoader`. Usually just a reference to the class itself.
 */
export function registerLocaleLoader(localeLoader: UnboundProvider<AppLocaleLoader>): Provider {
  return bindProvider(AppLocaleLoader, localeLoader, { multi: true });
}
