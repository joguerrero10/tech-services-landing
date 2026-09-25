import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import postcss from 'postcss';

const colors = new Map();
const css = postcss.parse(await readFile('src/styles.css', 'utf8'));
css.walkAtRules('theme', (rule) => {
  rule.walkDecls(/^--color-/, (decl) => colors.set(decl.prop.slice(8), decl.value));
});
function luminance(name) {
  const hex = colors.get(name);
  assert.match(hex ?? '', /^#[\da-f]{6}$/i, `Missing hexadecimal token: ${name}`);
  const [r, g, b] = hex
    .slice(1)
    .match(/../g)
    .map((channel) => {
      const value = parseInt(channel, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const pairs = [
  ['text', 'background', 4.5],
  ['text-muted', 'background', 4.5],
  ['text-muted', 'surface', 4.5],
  ['primary', 'background', 4.5],
  ['primary', 'surface', 4.5],
  ['on-primary', 'primary', 4.5],
  ['on-primary', 'primary-hover', 4.5],
  ['accent', 'background', 4.5],
  ['accent', 'surface', 4.5],
  ['on-primary', 'accent', 4.5],
  ['accent-strong', 'accent-soft', 4.5],
  ['control-border', 'background', 3],
  ['control-border', 'surface', 3],
];
let failed = false;
for (const [foreground, background, minimum] of pairs) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  const ratio = (values[0] + 0.05) / (values[1] + 0.05);
  console.log(`${foreground} / ${background}: ${ratio.toFixed(2)}:1 (minimum ${minimum}:1)`);
  if (ratio < minimum) failed = true;
}
assert.ok(!failed, 'Contrast below the required WCAG threshold.');
