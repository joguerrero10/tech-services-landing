interface ProjectPackage {
  readonly kind: 'project';
  readonly startingPrice: number;
  readonly currency: 'USD';
}
interface MaintenancePlan {
  readonly kind: 'maintenance';
  readonly monthlyPrice: number;
  readonly currency: 'USD';
}
export interface ServicesConfig {
  readonly 'landing-page': ProjectPackage;
  readonly website: ProjectPackage & { readonly maxSections: number };
  readonly 'online-store': ProjectPackage;
  readonly automation: ProjectPackage;
  readonly 'custom-system': ProjectPackage;
  readonly 'maintenance-basic': MaintenancePlan;
  readonly 'maintenance-support': MaintenancePlan & {
    readonly includedHours: number;
    readonly additionalHourlyRate: number;
    readonly requiresApprovalForExtraWork: true;
  };
}
export type ServiceId = keyof ServicesConfig;
export const SERVICES_CONFIG: ServicesConfig = {
  'landing-page': { kind: 'project', startingPrice: 250, currency: 'USD' },
  website: { kind: 'project', startingPrice: 450, maxSections: 5, currency: 'USD' },
  'online-store': { kind: 'project', startingPrice: 750, currency: 'USD' },
  automation: { kind: 'project', startingPrice: 200, currency: 'USD' },
  'custom-system': { kind: 'project', startingPrice: 1200, currency: 'USD' },
  'maintenance-basic': { kind: 'maintenance', monthlyPrice: 40, currency: 'USD' },
  'maintenance-support': {
    kind: 'maintenance',
    monthlyPrice: 100,
    includedHours: 2,
    additionalHourlyRate: 50,
    requiresApprovalForExtraWork: true,
    currency: 'USD',
  },
};
