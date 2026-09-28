import type { ServiceId } from '../config/services.config';
import type { ProductId } from '../config/site.config';
import type { TranslationKey } from '../i18n/translation.model';

export type ContactInquiry =
  | { readonly kind: 'general' }
  | { readonly kind: 'service'; readonly serviceId: ServiceId }
  | { readonly kind: 'product'; readonly productId: ProductId };

export const SERVICE_MESSAGES = {
  tutoring: 'whatsapp.tutoring',
  'python-course': 'whatsapp.pythonCourse',
  development: 'whatsapp.development',
  maintenance: 'whatsapp.maintenance',
} as const satisfies Record<ServiceId, TranslationKey>;
