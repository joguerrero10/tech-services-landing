import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { SITE_SETTINGS } from '../src/app/core/config/site-settings.ts';
import { seoFiles } from './seo-files.mjs';

test('preview and missing domain never advertise a sitemap or allow crawling', () => {
  for (const environment of ['preview', 'production']) {
    const result = seoFiles(SITE_SETTINGS, environment);
    assert.equal(result.sitemap, null);
    assert.match(result.robots, /Disallow: \//);
  }
  assert.equal(
    seoFiles({ ...SITE_SETTINGS, publicSiteUrl: 'https://example.test' }, 'preview').sitemap,
    null,
  );
});
test('production sitemap contains both localized URLs and reciprocal alternatives', () => {
  const result = seoFiles(
    { ...SITE_SETTINGS, publicSiteUrl: 'https://example.test/' },
    'production',
  );
  const dom = new JSDOM(result.sitemap, { contentType: 'text/xml' });
  assert.equal(dom.window.document.querySelectorAll('url').length, 2);
  assert.equal(dom.window.document.querySelectorAll('[hreflang]').length, 6);
  assert.match(result.robots, /Allow: \/\nSitemap: https:\/\/example.test\/sitemap.xml/);
  assert.equal(result.indexable, true);
  dom.window.close();
});
test('invalid origin and environment fail explicitly', () => {
  for (const publicSiteUrl of [
    'invalid',
    'http://example.test',
    'https://localhost',
    'https://example.test/subpath',
    'https://user:pass@example.test',
  ]) {
    assert.throws(() => seoFiles({ ...SITE_SETTINGS, publicSiteUrl }, 'production'));
  }
  assert.throws(() => seoFiles(SITE_SETTINGS, 'typo'));
});
