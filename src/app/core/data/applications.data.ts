import { SITE_CONFIG, ProductId } from '../config/site.config';
import type { IconName } from './icons.data';
import type { TranslationKey } from '../i18n/translation.model';
interface ApplicationItem {
  readonly id: ProductId;
  readonly icon: IconName;
  readonly name: TranslationKey;
  readonly action: TranslationKey;
  readonly image: { readonly src: string; readonly srcset: string; readonly alt: TranslationKey };
  readonly status: TranslationKey;
  readonly lifecycle: (typeof SITE_CONFIG.products)[ProductId]['status'];
  readonly description: TranslationKey;
  readonly features: readonly TranslationKey[];
}
const STATUS_KEYS = {
  published: 'applications.status.published',
  development: 'applications.status.development',
  unpublished: 'applications.status.unpublished',
} as const satisfies Record<string, TranslationKey>;

export const APPLICATIONS = [
  {
    id: 'finance',
    status: STATUS_KEYS[SITE_CONFIG.products['finance'].status],
    lifecycle: SITE_CONFIG.products['finance'].status,
    icon: 'wallet',
    name: SITE_CONFIG.products.finance.nameKey,
    action: 'applications.finance.action',
    image: {
      src: 'images/smartfinance.webp',
      srcset: 'images/smartfinance-480.webp 480w, images/smartfinance.webp 960w',
      alt: 'applications.finance.imageAlt',
    },
    description: 'applications.finance.description',
    features: [
      'applications.finance.features.first',
      'applications.finance.features.second',
      'applications.finance.features.third',
    ],
  },
  {
    id: 'pos',
    status: STATUS_KEYS[SITE_CONFIG.products['pos'].status],
    lifecycle: SITE_CONFIG.products['pos'].status,
    icon: 'calculator',
    name: SITE_CONFIG.products.pos.nameKey,
    action: 'applications.pos.action',
    image: {
      src: 'images/smartpos.webp',
      srcset: 'images/smartpos-480.webp 480w, images/smartpos.webp 960w',
      alt: 'applications.pos.imageAlt',
    },
    description: 'applications.pos.description',
    features: [
      'applications.pos.features.first',
      'applications.pos.features.second',
      'applications.pos.features.third',
    ],
  },
  {
    id: 'omnisphere',
    status: STATUS_KEYS[SITE_CONFIG.products['omnisphere'].status],
    lifecycle: SITE_CONFIG.products['omnisphere'].status,
    icon: 'messages-square',
    name: SITE_CONFIG.products['omnisphere'].nameKey,
    action: 'applications.omnisphere.action',
    image: {
      src: 'images/omnisphere.webp',
      srcset: 'images/omnisphere-480.webp 480w, images/omnisphere.webp 960w',
      alt: 'applications.omnisphere.imageAlt',
    },
    description: 'applications.omnisphere.description',
    features: [
      'applications.omnisphere.features.first',
      'applications.omnisphere.features.second',
      'applications.omnisphere.features.third',
    ],
  },
  {
    id: 'helpdesk',
    status: STATUS_KEYS[SITE_CONFIG.products['helpdesk'].status],
    lifecycle: SITE_CONFIG.products['helpdesk'].status,
    icon: 'wrench',
    name: SITE_CONFIG.products['helpdesk'].nameKey,
    action: 'applications.helpdesk.action',
    image: {
      src: 'images/helpdesk.webp',
      srcset: 'images/helpdesk-480.webp 480w, images/helpdesk.webp 960w',
      alt: 'applications.helpdesk.imageAlt',
    },
    description: 'applications.helpdesk.description',
    features: [
      'applications.helpdesk.features.first',
      'applications.helpdesk.features.second',
      'applications.helpdesk.features.third',
    ],
  },
  {
    id: 'world-cup',
    status: STATUS_KEYS[SITE_CONFIG.products['world-cup'].status],
    lifecycle: SITE_CONFIG.products['world-cup'].status,
    icon: 'calculator',
    name: SITE_CONFIG.products['world-cup'].nameKey,
    action: 'applications.worldCup.action',
    image: {
      src: 'images/world-cup.webp',
      srcset: 'images/world-cup-480.webp 480w, images/world-cup.webp 960w',
      alt: 'applications.worldCup.imageAlt',
    },
    description: 'applications.worldCup.description',
    features: [
      'applications.worldCup.features.first',
      'applications.worldCup.features.second',
      'applications.worldCup.features.third',
    ],
  },
  {
    id: 'black-ninja',
    status: STATUS_KEYS[SITE_CONFIG.products['black-ninja'].status],
    lifecycle: SITE_CONFIG.products['black-ninja'].status,
    icon: 'terminal',
    name: SITE_CONFIG.products['black-ninja'].nameKey,
    action: 'applications.blackNinja.action',
    image: {
      src: 'images/black-ninja.webp',
      srcset: 'images/black-ninja-480.webp 480w, images/black-ninja.webp 960w',
      alt: 'applications.blackNinja.imageAlt',
    },
    description: 'applications.blackNinja.description',
    features: [
      'applications.blackNinja.features.first',
      'applications.blackNinja.features.second',
      'applications.blackNinja.features.third',
    ],
  },
] as const satisfies readonly ApplicationItem[];
