import type { TranslationKey } from '../i18n/translation.model';

export const TECHNOLOGIES = [
  'about.technologies.angular',
  'about.technologies.node',
  'about.technologies.java',
  'about.technologies.python',
  'about.technologies.aws',
  'about.technologies.azure',
  'about.technologies.sql',
  'about.technologies.mongodb',
] as const satisfies readonly TranslationKey[];

export const VALUES = [
  'about.values.security',
  'about.values.pricing',
  'about.values.support',
] as const satisfies readonly TranslationKey[];
