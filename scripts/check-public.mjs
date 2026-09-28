import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
const root = 'dist/tech-services-landing/browser';
async function walk(directory) {
  return (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? walk(`${directory}/${entry.name}`) : `${directory}/${entry.name}`,
      ),
    )
  ).flat();
}
const files = await walk(root);
const available = new Set(files.map((file) => file.slice(root.length)));
const referenced = new Set();
for (const file of files) {
  if (!/\.(html|css|js|svg|json|txt)$/.test(file)) continue;
  const source = await readFile(file, 'utf8');
  assert.doesNotMatch(
    source,
    /SmartNova|Smart\s?Academy|Joel\./i,
    `Excluded name in public output: ${file}`,
  );
  if (/\.(html|css)$/.test(file)) {
    for (const match of source.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g))
      referenced.add(match[1]);
  }
  if (file.endsWith('.html')) {
    const dom = new JSDOM(source);
    for (const element of dom.window.document.querySelectorAll('[src],link[href]')) {
      if (element.matches('link[rel="canonical"],link[rel="alternate"]')) continue;
      referenced.add(element.getAttribute('src') ?? element.getAttribute('href'));
    }
    for (const image of dom.window.document.querySelectorAll('[srcset]')) {
      for (const candidate of image.getAttribute('srcset').split(','))
        referenced.add(candidate.trim().split(/\s+/)[0]);
    }
    dom.window.close();
  }
}
for (const reference of referenced) {
  if (/^(data:|https?:|#)/.test(reference)) continue;
  const path = '/' + reference.replace(/^\.?\//, '').split('?')[0];
  assert.ok(available.has(path), `Missing referenced asset: ${path}`);
}
if (process.argv.includes('--http')) {
  for (const path of available) {
    const response = await fetch(`http://127.0.0.1:4300${path}`);
    assert.equal(response.status, 200, `HTTP error: ${path}`);
  }
}
console.log(
  `Public output: ${files.length} files scanned, ${referenced.size} asset references valid, no excluded public names.${process.argv.includes('--http') ? ' All files return HTTP 200.' : ''}`,
);
