import type { ServiceId } from '../config/services.config';
import type { ProductId } from '../config/site.config';
import type { TranslationKey } from '../i18n/translation.model';

export type ContactInquiry =
  | { readonly kind: 'general' }
  | { readonly kind: 'service'; readonly serviceId: ServiceId }
  | { readonly kind: 'product'; readonly productId: ProductId };

export const SERVICE_MESSAGES = {
  'landing-page': 'whatsapp.landingPage',
  website: 'whatsapp.website',
  'online-store': 'whatsapp.onlineStore',
  automation: 'whatsapp.automation',
  'custom-system': 'whatsapp.customSystem',
  'maintenance-basic': 'whatsapp.maintenanceBasic',
  'maintenance-support': 'whatsapp.maintenanceSupport',
} as const satisfies Record<ServiceId, TranslationKey>;
