export interface ServicesConfig {
  readonly tutoring: {
    readonly hourlyRate: number;
    readonly packageHours: number;
    readonly packagePrice: number;
    readonly currency: 'USD';
  };
  readonly 'python-course': {
    readonly status: 'upcoming';
    readonly pricePerStudent: number;
    readonly sessions: number;
    readonly hoursPerSession: number;
    readonly minStudents: number;
    readonly maxStudents: number;
    readonly currency: 'USD';
  };
  readonly development: {
    readonly referenceHourlyRate: number;
    readonly exampleHours: number;
    readonly currency: 'USD';
  };
  readonly maintenance: {
    readonly monthlyPrice: number;
    readonly includedHours: number;
    readonly additionalHourlyRate: number;
    readonly requiresApprovalForExtraWork: boolean;
    readonly currency: 'USD';
  };
}
export type ServiceId = keyof ServicesConfig;
export const SERVICES_CONFIG: ServicesConfig = {
  tutoring: { hourlyRate: 30, packageHours: 4, packagePrice: 120, currency: 'USD' },
  'python-course': {
    status: 'upcoming',
    pricePerStudent: 120,
    sessions: 6,
    hoursPerSession: 2,
    minStudents: 4,
    maxStudents: 6,
    currency: 'USD',
  },
  development: { referenceHourlyRate: 50, exampleHours: 40, currency: 'USD' },
  maintenance: {
    monthlyPrice: 100,
    includedHours: 2,
    additionalHourlyRate: 50,
    requiresApprovalForExtraWork: true,
    currency: 'USD',
  },
};
