import { SERVICES_CONFIG, ServiceId, ServicesConfig } from '../config/services.config';

export type ServiceInterpolations = Record<ServiceId, Record<string, string | number>>;
export function serviceInterpolations(
  locale: string,
  config: ServicesConfig = SERVICES_CONFIG,
): ServiceInterpolations {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const values = {} as ServiceInterpolations;
  for (const id of Object.keys(config) as ServiceId[]) {
    const service = config[id];
    values[id] = {
      price: formatter.format(
        service.kind === 'project' ? service.startingPrice : service.monthlyPrice,
      ),
    };
    if ('maxSections' in service) values[id]['maxSections'] = service.maxSections;
    if ('includedHours' in service) {
      values[id]['includedHours'] = service.includedHours;
      values[id]['additionalHourlyRate'] = formatter.format(service.additionalHourlyRate);
    }
  }
  return values;
}
