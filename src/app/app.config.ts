import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { LocalTranslationLoader } from './core/i18n/local-translation-loader';
import { LanguageService } from './core/services/language.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      fallbackLang: 'es',
      loader: provideTranslateLoader(LocalTranslationLoader),
    }),
    provideAppInitializer(() => inject(LanguageService).initialize()),
  ],
};
