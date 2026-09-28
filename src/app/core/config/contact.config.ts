import { inject, InjectionToken } from '@angular/core';
import { PUBLIC_SITE_CONFIG } from './site.config';

export interface ContactConfig {
  /** International digits, without +. Null when no confirmed number is available. */
  readonly whatsappNumber: string | null;
}
// Keep the narrow contact token for existing consumers and isolated configuration tests.
export const CONTACT_CONFIG = new InjectionToken<ContactConfig>('CONTACT_CONFIG', {
  providedIn: 'root',
  factory: () => ({ whatsappNumber: inject(PUBLIC_SITE_CONFIG).whatsappNumber }),
});
