import type { Routes } from '@angular/router';
import { DEFAULT_LANGUAGE, LOCALES } from './core/i18n/locale.config';
import { resolveLocale } from './core/i18n/locale.resolver';

const loadLanding = () => import('./features/landing/landing').then((m) => m.Landing);
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: LOCALES[DEFAULT_LANGUAGE].path },
  ...Object.values(LOCALES).map(({ path, language }) => ({
    path,
    loadComponent: loadLanding,
    resolve: { language: resolveLocale(language) },
  })),
  { path: '**', redirectTo: LOCALES[DEFAULT_LANGUAGE].path },
];
