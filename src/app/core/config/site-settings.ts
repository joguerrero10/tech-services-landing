export const SITE_SETTINGS = {
  whatsappNumber: '50768702316' as string | null,
  publicSiteUrl: 'https://joguerrero10.github.io/tech-services-landing' as string | null,
  instagramUrl: 'https://www.instagram.com/techtogether.pa/',
  supportedLocales: ['es', 'en'],
  defaultLocale: 'es',
  locales: {
    es: {
      path: 'es',
      language: 'es',
      locale: 'es-PA',
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
    finance: { id: 'finance', status: 'published', nameKey: 'applications.finance.name' },
    pos: { id: 'pos', status: 'development', nameKey: 'applications.pos.name' },
    omnisphere: {
      id: 'omnisphere',
      status: 'development',
      nameKey: 'applications.omnisphere.name',
    },
    helpdesk: { id: 'helpdesk', status: 'unpublished', nameKey: 'applications.helpdesk.name' },
    'world-cup': { id: 'world-cup', status: 'unpublished', nameKey: 'applications.worldCup.name' },
    'black-ninja': {
      id: 'black-ninja',
      status: 'unpublished',
      nameKey: 'applications.blackNinja.name',
    },
  },
} as const;
