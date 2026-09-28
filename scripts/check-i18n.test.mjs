import { test } from 'node:test';
import assert from 'node:assert/strict';
import { keysInSource, validateDictionaries } from './check-i18n.mjs';

test('accepts matching keys and interpolation names regardless of order', () => {
  assert.deepEqual(
    validateDictionaries({
      es: { service: '{{price}} / {{unit}}' },
      en: { service: '{{unit}}: {{ price }}' },
    }),
    [],
  );
});
test('detects missing keys, empty translations and mismatched interpolations', () => {
  const errors = validateDictionaries({
    es: { price: '{{price}}', action: 'Abrir', empty: 'Texto' },
    en: { price: '{{amount}}', empty: ' ' },
  });
  assert.ok(errors.some((e) => e.includes('interpolation mismatch')));
  assert.ok(errors.some((e) => e.includes('action')));
  assert.ok(errors.some((e) => e.includes('empty')));
});
test('detects nonexistent keys in templates and typed data, including unknown namespaces', () => {
  const keys = [
    ...keysInSource("{{ 'unknown.title' | translate }}", 'component.html'),
    ...keysInSource("const item = { title: 'services.missing' };", 'data.ts'),
  ];
  assert.equal(validateDictionaries({ es: {}, en: {} }, keys).length, 4);
});
test('excludes file paths and the storage key, and rejects HTML in translations', () => {
  assert.deepEqual(
    keysInSource(
      "const LANGUAGE_STORAGE_KEY = 'landing.language'; const file = 'hero.html';",
      'config.ts',
    ),
    [],
  );
  assert.ok(validateDictionaries({ es: { title: '<b>Hola</b>' } }).length > 0);
});

test('does not mistake bound template expressions for translation key literals', () => {
  assert.deepEqual(
    keysInSource(
      `<app-icon [name]="item.icon" /><p>{{ item.title | translate }}</p><a label="contact.whatsapp">{{ 'identity.name' | translate }}</a>`,
      'template.html',
    ),
    ['identity.name', 'contact.whatsapp', 'identity.name'],
  );
});

test('detects missing root keys passed directly to a pipe or TranslateService', () => {
  const keys = [
    ...keysInSource("{{ 'missing' | translate }}", 'template.html'),
    ...keysInSource("this.translate.instant('missing')", 'component.ts'),
  ];
  assert.deepEqual(keys, ['missing', 'missing']);
  assert.equal(validateDictionaries({ es: {}, en: {} }, keys).length, 2);
});
