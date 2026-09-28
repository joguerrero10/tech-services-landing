import type { TranslationKey } from '../i18n/translation.model';
interface NavigationItem {
  readonly fragment: string;
  readonly label: TranslationKey;
}
export const NAVIGATION = [
  { fragment: 'servicios', label: 'navigation.services' },
  { fragment: 'aplicaciones', label: 'navigation.applications' },
  { fragment: 'proceso', label: 'navigation.process' },
] as const satisfies readonly NavigationItem[];
export const FOOTER_NAVIGATION = [
  NAVIGATION[0],
  NAVIGATION[1],
  { fragment: 'contacto', label: 'navigation.contact' },
] as const satisfies readonly NavigationItem[];
