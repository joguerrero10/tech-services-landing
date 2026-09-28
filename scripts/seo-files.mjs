import { publicOrigin } from '../src/app/core/config/public-origin.ts';

export function seoFiles(config, environment) {
  if (!['preview', 'production'].includes(environment))
    throw new Error('SEO_ENV must be preview or production');
  const origin = publicOrigin(config.publicSiteUrl);
  if (config.publicSiteUrl && !origin)
    throw new Error('publicSiteUrl must be a valid public HTTPS root origin');
  const indexable = environment === 'production' && Boolean(origin);
  if (!indexable) return { indexable, sitemap: null, robots: 'User-agent: *\nDisallow: /\n' };
  const xml = (value) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('"', '&quot;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  const alternatives = [...config.supportedLocales, 'x-default']
    .map((locale) => {
      const language = locale === 'x-default' ? config.defaultLocale : locale;
      return `<xhtml:link rel="alternate" hreflang="${locale}" href="${xml(origin)}/${config.locales[language].path}"/>`;
    })
    .join('');
  const entries = config.supportedLocales
    .map(
      (locale) =>
        `<url><loc>${xml(origin)}/${config.locales[locale].path}</loc>${alternatives}</url>`,
    )
    .join('');
  return {
    indexable,
    sitemap: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>\n`,
    robots: `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  };
}
