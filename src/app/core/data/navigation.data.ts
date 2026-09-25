import type { TranslationKey } from '../i18n/translation.model';
interface NavigationItem {
  readonly href: string;
  readonly label: TranslationKey;
}
export const NAVIGATION = [
  { href: '#servicios', label: 'navigation.services' },
  { href: '#aplicaciones', label: 'navigation.applications' },
  { href: '#proceso', label: 'navigation.process' },
] as const satisfies readonly NavigationItem[];
export const FOOTER_NAVIGATION = [
  NAVIGATION[0],
  NAVIGATION[1],
  { href: '#contacto', label: 'navigation.contact' },
] as const satisfies readonly NavigationItem[];
