import { makeStateKey, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ServicePricing } from './service-pricing.service';
import { serviceInterpolations } from '../i18n/service-interpolations';

it('uses transferred server monetary strings without reformatting during hydration', () => {
  const values = serviceInterpolations('es-ES');
  values.tutoring['hourlyRate'] = 'USD\u00a030,00';
  const state = TestBed.inject(TransferState);
  state.set(makeStateKey<typeof values>('service-pricing:es-ES'), values);
  const service = TestBed.inject(ServicePricing);
  expect(service.forLocale('es-ES')).toBe(values);
  expect(service.forLocale('en-US')).toEqual(serviceInterpolations('en-US'));
});
