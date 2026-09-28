import { SERVICES_CONFIG, ServiceId, ServicesConfig } from '../config/services.config';

export type ServiceInterpolations = Record<ServiceId, Record<string, string | number>>;
export function serviceInterpolations(
  locale: string,
  config: ServicesConfig = SERVICES_CONFIG,
): ServiceInterpolations {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const money = (amount: number) => formatter.format(amount);
  const tutoring = config.tutoring;
  const course = config['python-course'];
  const development = config.development;
  const maintenance = config.maintenance;
  return {
    tutoring: {
      hourlyRate: money(tutoring.hourlyRate),
      packageHours: tutoring.packageHours,
      packagePrice: money(tutoring.packagePrice),
    },
    'python-course': {
      pricePerStudent: money(course.pricePerStudent),
      sessions: course.sessions,
      hoursPerSession: course.hoursPerSession,
      totalHours: course.sessions * course.hoursPerSession,
      minStudents: course.minStudents,
      maxStudents: course.maxStudents,
    },
    development: {
      referenceHourlyRate: money(development.referenceHourlyRate),
      exampleHours: development.exampleHours,
      examplePrice: money(development.exampleHours * development.referenceHourlyRate),
    },
    maintenance: {
      monthlyPrice: money(maintenance.monthlyPrice),
      includedHours: maintenance.includedHours,
      additionalHourlyRate: money(maintenance.additionalHourlyRate),
    },
  };
}
