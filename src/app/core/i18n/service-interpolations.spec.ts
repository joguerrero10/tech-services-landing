import { SERVICES_CONFIG } from '../config/services.config';
import { serviceInterpolations } from './service-interpolations';

describe('Service package prices', () => {
  it('uses updated config values for prices and included support hours', () => {
    const values = serviceInterpolations('es-PA', {
      ...SERVICES_CONFIG,
      'landing-page': { ...SERVICES_CONFIG['landing-page'], startingPrice: 325 },
      'maintenance-support': {
        ...SERVICES_CONFIG['maintenance-support'],
        includedHours: 3,
        additionalHourlyRate: 75,
      },
    });
    expect(values['landing-page']['price']).toBe('$325');
    expect(values['maintenance-support']['includedHours']).toBe(3);
    expect(values['maintenance-support']['additionalHourlyRate']).toBe('$75');
  });
  it('renders the seven USD package prices without decimals in both locales', () => {
    for (const locale of ['es-PA', 'en-US']) {
      const values = serviceInterpolations(locale);
      expect(Object.values(values).map((value) => value['price'])).toEqual([
        '$250',
        '$450',
        '$750',
        '$200',
        '$1,200',
        '$40',
        '$100',
      ]);
    }
  });
});
