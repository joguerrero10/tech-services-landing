export const SITE_SETTINGS = {
  whatsappNumber: '50768702316' as string | null,
  publicSiteUrl: 'https://joguerrero10.github.io/tech-services-landing' as string | null,
  supportedLocales: ['es', 'en'],
  defaultLocale: 'es',
  locales: {
    es: {
      path: 'es',
      language: 'es',
      locale: 'es-ES',
      labelKey: 'language.es',
    },
    en: {
      path: 'en',
      language: 'en',
      locale: 'en-US',
      labelKey: 'language.en',
    },
  },
  products: {
    finance: { id: 'finance', nameKey: 'applications.finance.name' },
    pos: { id: 'pos', nameKey: 'applications.pos.name' },
  },
} as const;
