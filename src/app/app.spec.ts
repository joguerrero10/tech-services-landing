import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideTranslateService, provideTranslateLoader } from '@ngx-translate/core';
import { LocalTranslationLoader } from './core/i18n/local-translation-loader';
import { routes } from './app.routes';
import { LanguageService } from './core/services/language.service';
import { LANGUAGE_STORAGE_KEY } from './core/i18n/locale.config';
import { Landing } from './features/landing/landing';

describe('Locale routes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideTranslateService({
          fallbackLang: 'es',
          loader: provideTranslateLoader(LocalTranslationLoader),
        }),
      ],
    }).compileComponents();
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('renders direct English entry with matching document language and SEO before showing the page', async () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'es');
    const harness = await RouterTestingHarness.create('/en');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Technology');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toContain('Independent team');
    expect(harness.routeNativeElement?.textContent).not.toMatch(/hero\.title|{{/);
  });
  it('redirects root and invalid paths to Spanish regardless of stored preference', async () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
    const harness = await RouterTestingHarness.create();
    for (const path of ['/', '/fr', '/en/unknown', '/unknown']) {
      await harness.navigateByUrl(path, Landing);
      expect(TestBed.inject(Router).url).toBe('/es');
      expect(document.documentElement.lang).toBe('es');
      expect(harness.routeNativeElement?.querySelectorAll('.service-card')).toHaveLength(4);
    }
  });
  it('preserves the fragment and saves language selection without overriding explicit routes', async () => {
    const harness = await RouterTestingHarness.create('/es#servicios');
    await TestBed.inject(LanguageService).changeLanguage('en');
    expect(TestBed.inject(Router).url).toBe('/en#servicios');
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
    await harness.navigateByUrl('/es', Landing);
    expect(document.documentElement.lang).toBe('es');
  });
  it('keeps navigation working when storage is denied and reports a translated status', async () => {
    await RouterTestingHarness.create('/es');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Blocked');
    });
    const service = TestBed.inject(LanguageService);
    await service.changeLanguage('en');
    expect(TestBed.inject(Router).url).toBe('/en');
    expect(service.error()).toBe('errors.preferenceStorage');
    expect(service.changing()).toBe(false);
  });
  it('handles unsupported selections and failed navigation without changing the locale', async () => {
    await RouterTestingHarness.create('/es');
    const service = TestBed.inject(LanguageService);
    await service.changeLanguage('fr');
    expect(service.error()).toBe('errors.unsupportedLanguage');
    vi.spyOn(TestBed.inject(Router), 'navigate').mockRejectedValue(new Error('Navigation failed'));
    await service.changeLanguage('en');
    expect(service.error()).toBe('errors.languageChange');
    expect(service.language()).toBe('es');
    expect(service.changing()).toBe(false);
  });
  it('resolves the dictionary and metadata on the server without reading browser storage', async () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    const storage = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Browser only');
    });
    const harness = await RouterTestingHarness.create('/en');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Technology');
    expect(storage).not.toHaveBeenCalled();
  });
});
