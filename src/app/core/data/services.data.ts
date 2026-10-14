import type { ServiceId } from '../config/services.config';
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
}
export const SERVICES = [
  {
    id: 'landing-page',
    icon: 'laptop-code',
    title: 'services.landingPage.title',
    description: 'services.landingPage.description',
    price: 'services.landingPage.price',
    detail: 'services.landingPage.detail',
    action: 'services.landingPage.action',
  },
  {
    id: 'website',
    icon: 'laptop-code',
    title: 'services.website.title',
    description: 'services.website.description',
    price: 'services.website.price',
    detail: 'services.website.detail',
    action: 'services.website.action',
  },
  {
    id: 'online-store',
    icon: 'calculator',
    title: 'services.onlineStore.title',
    description: 'services.onlineStore.description',
    price: 'services.onlineStore.price',
    detail: 'services.onlineStore.detail',
    action: 'services.onlineStore.action',
  },
  {
    id: 'automation',
    icon: 'terminal',
    title: 'services.automation.title',
    description: 'services.automation.description',
    price: 'services.automation.price',
    detail: 'services.automation.detail',
    action: 'services.automation.action',
  },
  {
    id: 'custom-system',
    icon: 'code-xml',
    title: 'services.customSystem.title',
    description: 'services.customSystem.description',
    price: 'services.customSystem.price',
    detail: 'services.customSystem.detail',
    action: 'services.customSystem.action',
  },
  {
    id: 'maintenance-basic',
    icon: 'wrench',
    title: 'services.maintenanceBasic.title',
    description: 'services.maintenanceBasic.description',
    price: 'services.maintenanceBasic.price',
    detail: 'services.maintenanceBasic.detail',
    action: 'services.maintenanceBasic.action',
  },
  {
    id: 'maintenance-support',
    icon: 'wrench',
    title: 'services.maintenanceSupport.title',
    description: 'services.maintenanceSupport.description',
    price: 'services.maintenanceSupport.price',
    detail: 'services.maintenanceSupport.detail',
    action: 'services.maintenanceSupport.action',
  },
] as const satisfies readonly ServiceItem[];
