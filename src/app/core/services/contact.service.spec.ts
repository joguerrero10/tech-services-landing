import {
  provideTranslateLoader,
  provideTranslateService,
  TranslateService,
} from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { LocalTranslationLoader } from '../i18n/local-translation-loader';
import { ContactInquiry } from '../data/contact-inquiry';
import { SITE_CONFIG } from '../config/site.config';
import { TestBed } from '@angular/core/testing';
import { CONTACT_CONFIG } from '../config/contact.config';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService({
          fallbackLang: 'es',
          loader: provideTranslateLoader(LocalTranslationLoader),
        }),
      ],
    }),
  );

  it('uses stable inquiry IDs and interpolates each product name in both languages', async () => {
    const service = TestBed.inject(ContactService);
    const translate = TestBed.inject(TranslateService);
    const inquiries: ContactInquiry[] = [
      { kind: 'general' },
      { kind: 'service', serviceId: 'tutoring' },
      { kind: 'service', serviceId: 'python-course' },
      { kind: 'service', serviceId: 'development' },
      { kind: 'service', serviceId: 'maintenance' },
      { kind: 'product', productId: 'finance' },
      { kind: 'product', productId: 'pos' },
    ];
    for (const language of ['es', 'en']) {
      await firstValueFrom(translate.use(language));
      const messages = inquiries.map((inquiry) => {
        const state = service.link(inquiry);
        expect(state.status).toBe('available');
        if (state.status !== 'available') throw new Error('Missing configured contact');
        const url = new URL(state.url);
        expect(url.pathname).toBe('/' + SITE_CONFIG.whatsappNumber);
        return url.searchParams.get('text')!;
      });
      expect(new Set(messages).size).toBe(7);
      expect(
        messages.every((message) => message.startsWith(language === 'es' ? 'Hola,' : 'Hello,')),
      ).toBe(true);
      expect(messages[5]).toContain('SmartFinance PTY');
      expect(messages[6]).toContain('SmartPOS PTY');
      expect(messages.join('')).not.toMatch(/{{|whatsapp\./);
      if (language === 'es')
        expect(messages[0]).toBe('Hola, me gustaría conocer más sobre los servicios de su equipo.');
    }
  });

  it('encodes messages without changing the configured destination', () => {
    const service = TestBed.inject(ContactService);
    const url = new URL(service.whatsappUrl('Hola & Python + big data?')!);
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/50768702316');
    expect(url.searchParams.get('text')).toBe('Hola & Python + big data?');
    expect([...url.searchParams.keys()]).toEqual(['text']);
  });
  it('does not invent a destination when no contact is configured', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: CONTACT_CONFIG, useValue: { whatsappNumber: null } }],
    });
    expect(TestBed.inject(ContactService).whatsappUrl('Hola')).toBeNull();
    expect(TestBed.inject(ContactService).link({ kind: 'general' })).toEqual({
      status: 'unconfigured',
      explanation: 'contact.pending',
    });
  });
  it('rejects malformed numbers', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: CONTACT_CONFIG, useValue: { whatsappNumber: '123?redirect=other' } }],
    });
    expect(() => TestBed.inject(ContactService).whatsappUrl('Hola')).toThrow();
    expect(TestBed.inject(ContactService).link({ kind: 'general' })).toEqual({
      status: 'invalid',
      explanation: 'errors.contactUnavailable',
    });
  });
});
