import { InjectionToken } from '@angular/core';
export interface ContactConfig {
  /** International digits, without +. Keep null until a real contact is supplied. */
  readonly whatsappNumber: string | null;
}
export const CONTACT_CONFIG = new InjectionToken<ContactConfig>('CONTACT_CONFIG', {
  providedIn: 'root',
  factory: () => ({ whatsappNumber: '50768702316' }),
});
