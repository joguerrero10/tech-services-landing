import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

export function flatten(dictionary, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(dictionary)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) flatten(value, path, result);
    else result[path] = value;
  }
  return result;
}
export function validateDictionaries(dictionaries, usedKeys = []) {
  const issues = [];
  const locales = Object.entries(dictionaries).map(([locale, dictionary]) => [
    locale,
    flatten(dictionary),
  ]);
  const allKeys = new Set(locales.flatMap(([, dictionary]) => Object.keys(dictionary)));
  for (const key of allKeys) {
    let expected;
    for (const [locale, dictionary] of locales) {
      const value = dictionary[key];
      if (typeof value !== 'string' || !value.trim()) {
        issues.push(`${locale}: missing, empty or non-string translation ${key}`);
        continue;
      }
      const placeholders = [
        ...new Set([...value.matchAll(/{{\s*([\w]+)\s*}}/g)].map((match) => match[1])),
      ]
        .sort()
        .join(',');
      if (expected !== undefined && placeholders !== expected)
        issues.push(`${locale}: interpolation mismatch for ${key}`);
      expected ??= placeholders;
      if (/<\/?[a-z][^>]*>/i.test(value)) issues.push(`${locale}: HTML is not allowed in ${key}`);
    }
  }
  for (const key of new Set(usedKeys)) {
    for (const [locale, dictionary] of locales) {
      if (!Object.hasOwn(dictionary, key)) issues.push(`${locale}: unknown used key ${key}`);
    }
  }
  return issues;
}
async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? sourceFiles(path) : path;
      }),
    )
  ).flat();
}
export function keysInSource(source, filename) {
  const keys = [];
  const isKey = (value) =>
    /^[a-zA-Z][\w-]*(?:\.[\w-]+)+$/.test(value) && !/\.(html|css|json|svg|woff2|ico)$/.test(value);
  if (filename.endsWith('.ts')) {
    const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
    const visit = (node) => {
      const directTranslation =
        ts.isStringLiteral(node) &&
        ts.isCallExpression(node.parent) &&
        ts.isPropertyAccessExpression(node.parent.expression) &&
        ['instant', 'get', 'stream'].includes(node.parent.expression.name.text) &&
        node.parent.expression.expression.getText(tree).endsWith('translate');
      if (ts.isStringLiteral(node) && (isKey(node.text) || directTranslation)) {
        const isStorageKey =
          ts.isVariableDeclaration(node.parent) &&
          node.parent.name.getText(tree) === 'LANGUAGE_STORAGE_KEY';
        if (!isStorageKey) keys.push(node.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(tree);
  } else {
    for (const match of source.matchAll(/(['"])([^'"]+)\1\s*\|\s*translate\b/g))
      keys.push(match[2]);
    for (const match of source.matchAll(/(['"])([a-zA-Z][\w-]*(?:\.[\w-]+)+)\1/g)) {
      const boundExpression = /[\]\)]\s*=\s*$/.test(source.slice(0, match.index));
      if (!boundExpression && isKey(match[2])) keys.push(match[2]);
    }
  }
  return keys;
}
async function main() {
  const dictionaries = Object.fromEntries(
    await Promise.all(
      ['es', 'en'].map(async (locale) => [
        locale,
        JSON.parse(await readFile(`src/app/core/i18n/locales/${locale}.json`, 'utf8')),
      ]),
    ),
  );
  const usedKeys = [];
  for (const file of await sourceFiles('src/app')) {
    if (/\.(ts|html)$/.test(file) && !file.endsWith('.spec.ts'))
      usedKeys.push(...keysInSource(await readFile(file, 'utf8'), file));
  }
  const issues = validateDictionaries(dictionaries, usedKeys);
  if (issues.length) {
    console.error(issues.join('\n'));
    process.exitCode = 1;
  } else
    console.log(
      `i18n verified: es/en, ${Object.keys(flatten(dictionaries.es)).length} keys, matching interpolations, no empty translations or unknown used keys.`,
    );
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  await main();
