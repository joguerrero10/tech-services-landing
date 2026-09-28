import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { CONTACT_CONFIG } from '../../../core/config/contact.config';
import { LocalTranslationLoader } from '../../../core/i18n/local-translation-loader';
import { LanguageService } from '../../../core/services/language.service';
import { ContactLink } from './contact-link';

describe('Localized contact states', () => {
  it('updates the message in an existing CTA after language changes, without opening WhatsApp', async () => {
    TestBed.configureTestingModule({
      imports: [ContactLink],
      providers: [
        provideRouter([]),
        provideTranslateService({
          fallbackLang: 'es',
          loader: provideTranslateLoader(LocalTranslationLoader),
        }),
      ],
    });
    const language = TestBed.inject(LanguageService);
    await language.activate('es');
    const fixture = TestBed.createComponent(ContactLink);
    fixture.componentRef.setInput('inquiry', { kind: 'product', productId: 'finance' });
    const open = vi.spyOn(window, 'open');
    await fixture.whenStable();
    const getMessage = () =>
      new URL((fixture.nativeElement as HTMLElement).querySelector('a')!.href).searchParams.get(
        'text',
      );
    expect(getMessage()).toBe(
      'Hola, me gustaría conocer más sobre SmartFinance PTY y sus funcionalidades.',
    );
    await language.activate('en');
    await fixture.whenStable();
    expect(getMessage()).toBe(
      'Hello, I would like to learn more about SmartFinance PTY and its features.',
    );
    expect(open).not.toHaveBeenCalled();
    open.mockRestore();
  });

  for (const language of ['es', 'en'] as const) {
    for (const number of [null, 'invalid']) {
      it(`renders ${number === null ? 'pending' : 'error'} in ${language} without a link`, async () => {
        TestBed.configureTestingModule({
          imports: [ContactLink],
          providers: [
            provideRouter([]),
            provideTranslateService({
              fallbackLang: 'es',
              loader: provideTranslateLoader(LocalTranslationLoader),
            }),
            { provide: CONTACT_CONFIG, useValue: { whatsappNumber: number } },
          ],
        });
        await TestBed.inject(LanguageService).activate(language);
        const fixture = TestBed.createComponent(ContactLink);
        await fixture.whenStable();
        const element = fixture.nativeElement as HTMLElement;
        expect(element.querySelector('a')).toBeNull();
        expect(element.querySelector('[role="status"]')).not.toBeNull();
        expect(element.textContent).not.toMatch(/contact\.|errors\./);
        expect(element.textContent).toContain(
          number === null
            ? language === 'es'
              ? 'Pronto compartiremos'
              : 'We will share'
            : language === 'es'
              ? 'No podemos abrir'
              : 'We cannot open',
        );
      });
    }
  }
});
