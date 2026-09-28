import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { LocalTranslationLoader } from './core/i18n/local-translation-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideTranslateService({
      fallbackLang: 'es',
      loader: provideTranslateLoader(LocalTranslationLoader),
    }),
  ],
};
