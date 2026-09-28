import { SITE_CONFIG, ProductId } from '../config/site.config';
import type { IconName } from './icons.data';
import type { TranslationKey } from '../i18n/translation.model';
interface ApplicationItem {
  readonly id: ProductId;
  readonly icon: IconName;
  readonly name: TranslationKey;
  readonly action: TranslationKey;
}
export const APPLICATIONS = [
  {
    id: 'finance',
    icon: 'wallet',
    name: SITE_CONFIG.products.finance.nameKey,
    action: 'applications.finance.action',
  },
  {
    id: 'pos',
    icon: 'calculator',
    name: SITE_CONFIG.products.pos.nameKey,
    action: 'applications.pos.action',
  },
] as const satisfies readonly ApplicationItem[];
