import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { SITE_SETTINGS } from '../src/app/core/config/site-settings.ts';
import { publicOrigin } from '../src/app/core/config/public-origin.ts';
const base = 'dist/tech-services-landing/browser';
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
for (const lang of SITE_SETTINGS.supportedLocales) {
  const dictionary = JSON.parse(await readFile(`src/app/core/i18n/locales/${lang}.json`, 'utf8'));
  const html = await readFile(`${base}/${lang}/index.html`, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  assert.equal(doc.documentElement.lang, lang);
  assert.equal(
    doc.querySelector('select').value,
    lang,
    'Selected locale must match prerendered content',
  );
  assert.equal(doc.title, dictionary.seo.title);
  assert.equal(doc.querySelector('meta[name="description"]').content, dictionary.seo.description);
  assert.equal(doc.querySelector('meta[property="og:title"]').content, dictionary.seo.title);
  assert.equal(doc.querySelector('meta[property="og:type"]').content, 'website');
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(normalize(doc.querySelector('h1').textContent), dictionary.hero.title);
  assert.equal(doc.querySelectorAll('#servicios article').length, 4);
  const text = normalize(doc.querySelector('main').textContent);
  for (const product of ['SmartFinance PTY', 'SmartPOS PTY']) assert.ok(text.includes(product));
  assert.ok(text.includes(dictionary.services.pythonCourse.badge));
  const state = JSON.parse(doc.querySelector('script[type="application/json"]').textContent);
  const pricing = state[`service-pricing:${SITE_SETTINGS.locales[lang].locale}`];
  assert.ok(pricing, 'Server monetary formatting must be transferred');
  for (const parameters of Object.values(pricing)) {
    for (const value of Object.values(parameters))
      assert.ok(
        text.includes(normalize(String(value))),
        `Missing localized price/condition ${value}`,
      );
  }
  for (const [id, key] of Object.entries({
    tutoring: 'tutoring',
    'python-course': 'pythonCourse',
    development: 'development',
    maintenance: 'maintenance',
  })) {
    for (const [name, sentence] of Object.entries(dictionary.services[key])) {
      if (name === 'extraWithoutApproval') continue;
      const rendered = sentence.replace(/{{(\w+)}}/g, (_, variable) =>
        String(pricing[id][variable]),
      );
      assert.ok(text.includes(normalize(rendered)), `Missing complete service text: ${rendered}`);
    }
  }
  assert.doesNotMatch(text, /\{\{|\b(?:hero|services|applications|contact)\.[a-z]/);
  assert.doesNotMatch(html, /SmartNova|Smart\s?Academy|Joel\./i);
  const origin = publicOrigin(SITE_SETTINGS.publicSiteUrl);
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, origin ? 1 : 0);
  assert.equal(doc.querySelectorAll('link[hreflang]').length, origin ? 3 : 0);
  if (origin) assert.equal(doc.querySelector('link[rel="canonical"]').href, `${origin}/${lang}`);
  const image = doc.querySelector('.hero-photo');
  assert.ok(image.getAttribute('srcset').includes('.webp'));
  assert.ok(image.width && image.height);
  assert.notEqual(image.loading, 'lazy');
  dom.window.close();
  console.log(
    `${lang}: full HTML, localized metadata/content/pricing, hydration data and responsive image verified.`,
  );
}
const root = await readFile(`${base}/index.html`, 'utf8');
const baseHref = new JSDOM(root).window.document.querySelector('base').getAttribute('href');
assert.ok(root.includes(`url=${baseHref}es`));
assert.equal(new JSDOM(root).window.document.querySelectorAll('#servicios article').length, 4);
console.log('Root: localized content and static redirect to /es verified.');
