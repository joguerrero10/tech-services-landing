import type { IconName } from './icons.data';
import type { TranslationKey } from '../i18n/translation.model';
interface ServiceItem {
  readonly id: string;
  readonly icon: IconName;
  readonly title: TranslationKey;
  readonly description: TranslationKey;
  readonly price: TranslationKey;
  readonly detail: TranslationKey;
  readonly action: TranslationKey;
  readonly message: TranslationKey;
  readonly badge: TranslationKey | null;
}
export const SERVICES: readonly ServiceItem[] = [
  {
    id: 'tutoring',
    icon: 'book-open',
    title: 'services.tutoring.title',
    description: 'services.tutoring.description',
    price: 'services.tutoring.price',
    detail: 'services.tutoring.detail',
    action: 'services.tutoring.action',
    message: 'services.tutoring.message',
    badge: null,
  },
  {
    id: 'python',
    icon: 'terminal',
    title: 'services.python.title',
    description: 'services.python.description',
    price: 'services.python.price',
    detail: 'services.python.detail',
    action: 'services.python.action',
    message: 'services.python.message',
    badge: 'services.python.badge',
  },
  {
    id: 'development',
    icon: 'laptop-code',
    title: 'services.development.title',
    description: 'services.development.description',
    price: 'services.development.price',
    detail: 'services.development.detail',
    action: 'services.development.action',
    message: 'services.development.message',
    badge: null,
  },
  {
    id: 'maintenance',
    icon: 'wrench',
    title: 'services.maintenance.title',
    description: 'services.maintenance.description',
    price: 'services.maintenance.price',
    detail: 'services.maintenance.detail',
    action: 'services.maintenance.action',
    message: 'services.maintenance.message',
    badge: null,
  },
];
