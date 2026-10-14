import { makeStateKey, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ServicePricing } from './service-pricing.service';
import { serviceInterpolations } from '../i18n/service-interpolations';

it('uses transferred server monetary strings without reformatting during hydration', () => {
  const values = serviceInterpolations('es-PA');
  // A recognizable server value proves hydration uses TransferState instead of reformatting.
  values['landing-page']['price'] = '$250 (server)';
  const state = TestBed.inject(TransferState);
  state.set(makeStateKey<typeof values>('service-pricing:es-PA'), values);
  const service = TestBed.inject(ServicePricing);
  expect(service.forLocale('es-PA')).toBe(values);
  expect(service.forLocale('en-US')).toEqual(serviceInterpolations('en-US'));
});
