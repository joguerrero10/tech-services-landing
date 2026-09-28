import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { LanguageService } from '../services/language.service';
import type { Language } from './translation.model';

export function resolveLocale(language: Language): ResolveFn<Language> {
  return async () => {
    await inject(LanguageService).activate(language);
    return language;
  };
}
