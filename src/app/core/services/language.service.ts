import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { isLanguage, Language } from '../i18n/translation.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly currentLanguage = signal<Language>('es');
  readonly language = this.currentLanguage.asReadonly();

  initialize(): Promise<void> {
    return this.changeLanguage('es');
  }

  async changeLanguage(language: string): Promise<void> {
    if (!isLanguage(language)) throw new Error(`Unsupported language: ${language}`);
    await firstValueFrom(this.translate.use(language));
    this.currentLanguage.set(language);
    this.document.documentElement.lang = language;
    this.title.setTitle(this.translate.instant('meta.title'));
    this.meta.updateTag({
      name: 'description',
      content: this.translate.instant('meta.description'),
    });
    this.meta.updateTag({ property: 'og:title', content: this.translate.instant('meta.title') });
    this.meta.updateTag({
      property: 'og:description',
      content: this.translate.instant('meta.description'),
    });
  }
}
