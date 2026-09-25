import type { IconName } from './icons.data';
import type { TranslationKey } from '../i18n/translation.model';
interface ApplicationItem {
  readonly id: string;
  readonly icon: IconName;
  readonly name: TranslationKey;
  readonly action: TranslationKey;
  readonly message: TranslationKey;
}
export const APPLICATIONS = [
  {
    id: 'finance',
    icon: 'wallet',
    name: 'applications.finance.name',
    action: 'applications.finance.action',
    message: 'applications.finance.message',
  },
  {
    id: 'pos',
    icon: 'calculator',
    name: 'applications.pos.name',
    action: 'applications.pos.action',
    message: 'applications.pos.message',
  },
] as const satisfies readonly ApplicationItem[];
