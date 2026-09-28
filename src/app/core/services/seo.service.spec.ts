import { TestBed } from '@angular/core/testing';
import {
  provideTranslateLoader,
  provideTranslateService,
  TranslateService,
} from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { PUBLIC_SITE_CONFIG, SITE_CONFIG } from '../config/site.config';
import { LocalTranslationLoader } from '../i18n/local-translation-loader';
import { SeoService } from './seo.service';

for (const origin of [null, 'not-a-url', 'https://example.test']) {
  describe(`SEO with ${origin ?? 'pending domain'}`, () => {
    beforeEach(() =>
      TestBed.configureTestingModule({
        providers: [
          { provide: PUBLIC_SITE_CONFIG, useValue: { ...SITE_CONFIG, publicSiteUrl: origin } },
          provideTranslateService({ loader: provideTranslateLoader(LocalTranslationLoader) }),
        ],
      }),
    );
    afterEach(() =>
      document
        .querySelectorAll('link[rel="canonical"],link[hreflang]')
        .forEach((el) => el.remove()),
    );
    it('updates metadata and uses only configured absolute URLs without duplicates', async () => {
      const translate = TestBed.inject(TranslateService);
      const seo = TestBed.inject(SeoService);
      for (const language of ['es', 'en'] as const) {
        await firstValueFrom(translate.use(language));
        seo.update(language);
        seo.update(language);
        expect(document.title).toBe(translate.instant('seo.title'));
        expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe(
          'website',
        );
        expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(
          origin === 'https://example.test' ? 1 : 0,
        );
        expect(document.querySelectorAll('link[hreflang]').length).toBe(
          origin === 'https://example.test' ? 3 : 0,
        );
        if (origin === 'https://example.test') {
          expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
            `${origin}/${language}`,
          );
          expect(document.querySelector('link[hreflang="x-default"]')?.getAttribute('href')).toBe(
            `${origin}/es`,
          );
        } else expect(document.querySelector('meta[property="og:url"]')).toBeNull();
      }
    });
  });
}
