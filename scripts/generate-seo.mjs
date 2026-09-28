import { readFile, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SITE_SETTINGS } from '../src/app/core/config/site-settings.ts';
import { seoFiles } from './seo-files.mjs';

const directory = resolve('dist/tech-services-landing/browser');
const environment = process.env.SEO_ENV ?? 'preview';
const { indexable, sitemap, robots } = seoFiles(SITE_SETTINGS, environment);
for (const path of [
  'index.html',
  ...SITE_SETTINGS.supportedLocales.map(
    (locale) => `${SITE_SETTINGS.locales[locale].path}/index.html`,
  ),
]) {
  const file = resolve(directory, path);
  const html = (await readFile(file, 'utf8')).replace(/<meta name="robots"[^>]*>/g, '');
  await writeFile(
    file,
    html.replace(
      '</head>',
      `<meta name="robots" content="${indexable ? 'index, follow' : 'noindex, nofollow'}"></head>`,
    ),
  );
}
// Keep Angular's static root redirect, with useful localized content even without JavaScript.
const defaultPath = SITE_SETTINGS.locales[SITE_SETTINGS.defaultLocale].path;
const defaultHtml = await readFile(resolve(directory, `${defaultPath}/index.html`), 'utf8');
await writeFile(
  resolve(directory, 'index.html'),
  defaultHtml.replace(
    '</head>',
    `<meta http-equiv="refresh" content="0; url=/${defaultPath}"></head>`,
  ),
);
if (sitemap) await writeFile(resolve(directory, 'sitemap.xml'), sitemap);
else await rm(resolve(directory, 'sitemap.xml'), { force: true });
await writeFile(resolve(directory, 'robots.txt'), robots);
console.log(
  indexable
    ? 'Production SEO: indexing enabled, sitemap generated.'
    : 'Preview SEO: indexing disabled, sitemap omitted (domain or production environment pending).',
);
