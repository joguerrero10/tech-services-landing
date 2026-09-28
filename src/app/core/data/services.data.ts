import { SERVICES_CONFIG, ServiceId } from '../config/services.config';
import type { IconName } from './icons.data';
import type { TranslationKey } from '../i18n/translation.model';
interface ServiceItem {
  readonly id: ServiceId;
  readonly icon: IconName;
  readonly title: TranslationKey;
  readonly description: TranslationKey;
  readonly price: TranslationKey;
  readonly detail: TranslationKey;
  readonly action: TranslationKey;
  readonly badge: TranslationKey | null;
  readonly extra?: TranslationKey;
  readonly group?: TranslationKey;
  readonly example?: TranslationKey;
  readonly note?: TranslationKey;
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
    badge: null,
  },
  {
    id: 'python-course',
    icon: 'terminal',
    title: 'services.pythonCourse.title',
    description: 'services.pythonCourse.description',
    group: 'services.pythonCourse.group',
    price: 'services.pythonCourse.price',
    detail: 'services.pythonCourse.detail',
    action: 'services.pythonCourse.action',
    badge:
      SERVICES_CONFIG['python-course'].status === 'upcoming' ? 'services.pythonCourse.badge' : null,
  },
  {
    id: 'development',
    icon: 'laptop-code',
    title: 'services.development.title',
    description: 'services.development.description',
    price: 'services.development.price',
    detail: 'services.development.detail',
    example: 'services.development.example',
    action: 'services.development.action',
    badge: null,
  },
  {
    id: 'maintenance',
    icon: 'wrench',
    title: 'services.maintenance.title',
    description: 'services.maintenance.description',
    price: 'services.maintenance.price',
    detail: 'services.maintenance.detail',
    note: 'services.maintenance.note',
    action: 'services.maintenance.action',
    extra: SERVICES_CONFIG.maintenance.requiresApprovalForExtraWork
      ? 'services.maintenance.extraWithApproval'
      : 'services.maintenance.extraWithoutApproval',
    badge: null,
  },
];
