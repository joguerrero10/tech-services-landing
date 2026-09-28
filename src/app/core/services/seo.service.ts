import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PUBLIC_SITE_CONFIG } from '../config/site.config';
import { publicOrigin } from '../config/public-origin';
import { Language } from '../i18n/translation.model';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private readonly config = inject(PUBLIC_SITE_CONFIG);

  update(language: Language): void {
    const title = this.translate.instant('seo.title');
    const description = this.translate.instant('seo.description');
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    for (const [property, content] of Object.entries({
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:locale': this.config.locales[language].locale.replace('-', '_'),
    }))
      this.meta.updateTag({ property, content });
    this.document
      .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());
    this.meta.removeTag('property="og:url"');
    const origin = publicOrigin(this.config.publicSiteUrl);
    if (!origin) return;
    const url = `${origin}/${this.config.locales[language].path}`;
    this.meta.updateTag({ property: 'og:url', content: url });
    this.link('canonical', url);
    for (const locale of this.config.supportedLocales) {
      this.link('alternate', `${origin}/${this.config.locales[locale].path}`, locale);
    }
    this.link(
      'alternate',
      `${origin}/${this.config.locales[this.config.defaultLocale].path}`,
      'x-default',
    );
  }

  private link(rel: string, href: string, hreflang?: string): void {
    const element = this.document.createElement('link');
    element.rel = rel;
    element.href = href;
    if (hreflang) element.hreflang = hreflang;
    this.document.head.appendChild(element);
  }
}
