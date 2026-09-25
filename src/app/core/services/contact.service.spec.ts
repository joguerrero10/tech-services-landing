import { TestBed } from '@angular/core/testing';
import { CONTACT_CONFIG } from '../config/contact.config';
import { ContactService } from './contact.service';

describe('ContactService', () => {
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
  });
  it('rejects malformed numbers', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: CONTACT_CONFIG, useValue: { whatsappNumber: '123?redirect=other' } }],
    });
    expect(() => TestBed.inject(ContactService).whatsappUrl('Hola')).toThrow();
  });
});
