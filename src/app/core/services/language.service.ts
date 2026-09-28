import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { SeoService } from './seo.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { isLanguage, Language, TranslationKey } from '../i18n/translation.model';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, LOCALES } from '../i18n/locale.config';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly currentLanguage = signal<Language>(DEFAULT_LANGUAGE);
  readonly language = this.currentLanguage.asReadonly();
  readonly locale = computed(() => LOCALES[this.language()].locale);
  readonly changing = signal(false);
  readonly error = signal<TranslationKey | null>(null);

  // Called by the route resolver before creating the landing, on client or server.
  async activate(language: Language): Promise<void> {
    await firstValueFrom(this.translate.use(language));
    this.currentLanguage.set(language);
    this.document.documentElement.lang = language;
    this.seo.update(language);
  }

  async changeLanguage(value: string): Promise<void> {
    this.error.set(null);
    if (!isLanguage(value)) {
      this.error.set('errors.unsupportedLanguage');
      return;
    }
    if (this.changing()) return;
    this.changing.set(true);
    try {
      // The DOM fragment also covers native anchor changes not observed by Router.
      const fragment = isPlatformBrowser(this.platformId)
        ? this.document.defaultView?.location.hash.slice(1) ||
          this.router.parseUrl(this.router.url).fragment
        : this.router.parseUrl(this.router.url).fragment;
      const success = await this.router.navigate(['/', LOCALES[value].path], {
        fragment: fragment ?? undefined,
      });
      if (!success && this.language() !== value) {
        this.error.set('errors.languageChange');
        return;
      }
      this.savePreference(value);
    } catch {
      this.error.set('errors.languageChange');
    } finally {
      this.changing.set(false);
    }
  }

  private savePreference(language: Language): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      this.document.defaultView?.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Storage can be denied. The route remains authoritative and fully functional.
      this.error.set('errors.preferenceStorage');
    }
  }
}
