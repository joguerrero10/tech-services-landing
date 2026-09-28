import { SERVICES_CONFIG } from '../config/services.config';
import { serviceInterpolations } from './service-interpolations';

describe('Service prices and calculations', () => {
  it('calculates totals from the supplied rates and session lengths', () => {
    const values = serviceInterpolations('en-US', {
      ...SERVICES_CONFIG,
      'python-course': { ...SERVICES_CONFIG['python-course'], sessions: 8, hoursPerSession: 3 },
      development: { ...SERVICES_CONFIG.development, referenceHourlyRate: 60, exampleHours: 5 },
    });
    expect(values['python-course']['totalHours']).toBe(24);
    expect(values.development['examplePrice']).toBe('USD\u00a0300.00');
  });
  it('keeps USD and changes only number formatting between Spanish and English', () => {
    const es = serviceInterpolations('es-ES');
    const en = serviceInterpolations('en-US');
    expect(es.tutoring['hourlyRate']).toBe('30,00\u00a0USD');
    expect(en.tutoring['hourlyRate']).toBe('USD\u00a030.00');
    expect(es['python-course']['totalHours']).toBe(12);
    expect(en.development['examplePrice']).toBe('USD\u00a02,000.00');
    expect(SERVICES_CONFIG.tutoring.packagePrice).toBe(
      SERVICES_CONFIG.tutoring.hourlyRate * SERVICES_CONFIG.tutoring.packageHours,
    );
  });
});
