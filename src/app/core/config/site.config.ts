import { InjectionToken } from '@angular/core';
import type { TranslationKey } from '../i18n/translation.model';

import { SITE_SETTINGS } from './site-settings';

export const SITE_CONFIG = SITE_SETTINGS satisfies {
  locales: Record<string, { labelKey: TranslationKey }>;
  products: Record<string, { nameKey: TranslationKey }>;
};

export type ProductId = keyof typeof SITE_CONFIG.products;
export type SiteConfig = typeof SITE_CONFIG;
export const PUBLIC_SITE_CONFIG = new InjectionToken<SiteConfig>('PUBLIC_SITE_CONFIG', {
  providedIn: 'root',
  factory: () => SITE_CONFIG,
});
