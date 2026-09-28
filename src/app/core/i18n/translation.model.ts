import { SITE_CONFIG } from '../config/site.config';
import type es from './locales/es.json';

type Localized<T> = { [K in keyof T]: T[K] extends string ? string : Localized<T[K]> };
type LeafKeys<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${LeafKeys<T[K]>}`;
}[keyof T & string];
export type TranslationDictionary = Localized<typeof es>;
export type TranslationKey = LeafKeys<typeof es>;
export type Language = (typeof SITE_CONFIG.supportedLocales)[number];
export function isLanguage(value: string): value is Language {
  return SITE_CONFIG.supportedLocales.some((locale) => locale === value);
}
