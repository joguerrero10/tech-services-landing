import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import postcss from 'postcss';

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory() ? files(join(directory, entry.name)) : join(directory, entry.name),
      ),
    )
  ).flat();
}
const violations = [];
for (const file of await files('src')) {
  const source = await readFile(file, 'utf8');
  if (file.endsWith('.css')) {
    const root = postcss.parse(source, { from: file });
    root.walkDecls((decl) => {
      if (decl.prop === 'position' && /^(absolute|relative|fixed|sticky)$/.test(decl.value))
        violations.push(`${file}: forbidden positioning`);
      if (/\d(?:px|vw|vh|vmin|vmax|pt)\b/.test(decl.value))
        violations.push(`${file}: non-relative dimension ${decl.prop}: ${decl.value}`);
    });
    root.walkAtRules('media', (rule) => {
      if (/\d(?:px|vw|vh)\b/.test(rule.params)) violations.push(`${file}: non-relative breakpoint`);
    });
  }
  if (file.endsWith('.html') && /\b(?:absolute|relative|fixed|sticky|sr-only)\b/.test(source))
    violations.push(`${file}: forbidden positioning utility`);
}
if (violations.length) {
  console.error(violations.join('\n'));
  process.exitCode = 1;
} else console.log('Styles verified: normal flow, relative units and breakpoints.');
