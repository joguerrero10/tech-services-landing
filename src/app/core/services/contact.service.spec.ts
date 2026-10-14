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
      { kind: 'service', serviceId: 'landing-page' },
      { kind: 'service', serviceId: 'website' },
      { kind: 'service', serviceId: 'online-store' },
      { kind: 'service', serviceId: 'automation' },
      { kind: 'service', serviceId: 'custom-system' },
      { kind: 'service', serviceId: 'maintenance-basic' },
      { kind: 'service', serviceId: 'maintenance-support' },
      { kind: 'product', productId: 'finance' },
      { kind: 'product', productId: 'pos' },
      { kind: 'product', productId: 'omnisphere' },
      { kind: 'product', productId: 'helpdesk' },
      { kind: 'product', productId: 'world-cup' },
      { kind: 'product', productId: 'black-ninja' },
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
      expect(new Set(messages).size).toBe(14);
      expect(
        messages.every((message) => message.startsWith(language === 'es' ? 'Hola,' : 'Hello,')),
      ).toBe(true);
      expect(messages[8]).toContain('SmartFinance PTY');
      expect(messages[9]).toContain('SmartPOS PTY');
      expect(messages[10]).toContain('OmniSphere AI');
      expect(messages[11]).toContain('Helpdesk AI Automation');
      expect(messages[12]).toContain('World Cup Predictor AI');
      expect(messages[13]).toContain('Black Ninja');

      expect(messages.join('')).not.toMatch(/{{|whatsapp\./);
      if (language === 'es')
        expect(messages[0]).toBe(
          'Hola, Tech Together. Me gustaría conocer más sobre los servicios de Tech Together.',
        );
    }
  });

  it('encodes messages without changing the configured destination', () => {
    const service = TestBed.inject(ContactService);
    const url = new URL(service.whatsappUrl('Hola & catálogo + pagos?')!);
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/50768702316');
    expect(url.searchParams.get('text')).toBe('Hola & catálogo + pagos?');
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
