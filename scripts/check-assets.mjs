import { readFile, readdir } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const requiredPhotos = new Map([
  ['team-workspace-480.webp', [480, 400]],
  ['team-workspace-960.webp', [960, 800]],
  ['team-workspace-1440.webp', [1440, 1200]],
  ['contact-leaves-960.webp', [960, 320]],
  ['contact-leaves-1920.webp', [1920, 640]],
]);
const failures = [];
const pending = [];

function webpSize(buffer) {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP')
    throw new Error('Invalid WebP signature');
  for (let offset = 12; offset + 8 < buffer.length;) {
    const kind = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (kind === 'VP8X')
      return [buffer.readUIntLE(data + 4, 3) + 1, buffer.readUIntLE(data + 7, 3) + 1];
    if (kind === 'VP8 ')
      return [buffer.readUInt16LE(data + 6) & 0x3fff, buffer.readUInt16LE(data + 8) & 0x3fff];
    if (kind === 'VP8L') {
      const bits = buffer.readUInt32LE(data + 1);
      return [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
    }
    offset = data + size + (size % 2);
  }
  throw new Error('WebP has no image chunk');
}

for (const [name, expected] of requiredPhotos) {
  try {
    const file = await readFile(`public/images/${name}`);
    const size = webpSize(file);
    if (String(size) !== String(expected)) throw new Error(`Expected ${expected}, got ${size}`);
    console.log(`${name}: WebP ${size.join(' × ')}, ${file.length} bytes`);
  } catch (error) {
    if (error.code === 'ENOENT') pending.push(name);
    else failures.push(`${name}: ${error.message}`);
  }
}

for (const name of (await readdir('public/icons')).filter((name) => name.endsWith('.svg'))) {
  try {
    const source = await readFile(`public/icons/${name}`, 'utf8');
    const dom = new JSDOM(source, { contentType: 'image/svg+xml' });
    const svg = dom.window.document.documentElement;
    if (svg.localName !== 'svg' || svg.getAttribute('viewBox') !== '0 0 24 24')
      throw new Error('Missing or inconsistent viewBox');
    const allowed = new Set([
      'svg',
      'g',
      'path',
      'rect',
      'line',
      'polyline',
      'polygon',
      'circle',
      'ellipse',
      'title',
    ]);
    for (const element of [svg, ...svg.querySelectorAll('*')]) {
      if (!allowed.has(element.localName))
        throw new Error(`Forbidden SVG element: ${element.localName}`);
      for (const attr of element.attributes) {
        if (
          /^on/i.test(attr.name) ||
          /href|src/i.test(attr.name) ||
          /url\(|javascript:/i.test(attr.value)
        )
          throw new Error(`Unsafe SVG attribute: ${attr.name}`);
      }
    }
    dom.window.close();
    console.log(`${name}: valid local SVG, no scripts or external references`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  }
}

const font = await readFile('public/fonts/manrope-latin.woff2');
if (font.toString('ascii', 0, 4) !== 'wOF2') failures.push('Invalid WOFF2 signature');
else console.log(`Manrope: WOFF2, ${font.length} bytes`);
const ico = await readFile('public/favicon.ico');
if (ico.readUInt16LE(0) !== 0 || ico.readUInt16LE(2) !== 1) failures.push('Invalid ICO signature');
const sizes = [];
for (let i = 0; i < ico.readUInt16LE(4); i++) {
  const offset = 6 + i * 16;
  sizes.push([ico[offset] || 256, ico[offset + 1] || 256]);
}
for (const size of [16, 32, 48])
  if (!sizes.some(([w, h]) => w === size && h === size)) failures.push(`ICO missing ${size}`);
console.log(`Favicon ICO: ${sizes.map((size) => size.join(' × ')).join(', ')}`);

if (pending.length) console.error(`PENDING (not fabricated): ${pending.join(', ')}`);
if (failures.length) console.error(failures.join('\n'));
if (pending.length || failures.length) process.exitCode = 1;
