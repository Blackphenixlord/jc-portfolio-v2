/* Make web sizes of the photos.
   usage: node tools/build-images.mjs <photo-source-dir> <vitals-img-dir>
   Sources live in the old repo (src/imgs/_src and vitals/img); only the
   derivatives are committed here. Every image is auto-rotated from EXIF. */
import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

const [photoDir, vitalsDir] = process.argv.slice(2);
if (!photoDir || !vitalsDir) {
  console.error('usage: node tools/build-images.mjs <photo-source-dir> <vitals-img-dir>');
  process.exit(1);
}
const OUT = 'src/img';
const WIDTHS = [480, 960, 1440];
const VITALS = ['astronaut_answer', 'login', 'astronaut_vitals_planned'];
const SKIP = new Set(['nasa9', 'nasa11', 'nasa12', 'STUDENTBYSTUDENT3']); // not used on the site
const manifest = {};

async function make(file, name, { fallback = 'jpg' } = {}) {
  const base = sharp(file).rotate();
  const { width, height } = await base.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
  const widths = WIDTHS.filter((w) => w < width).concat(width < WIDTHS.at(-1) ? [width] : []).filter((w, i, a) => a.indexOf(w) === i);
  for (const w of widths) {
    const r = base.clone().resize({ width: w });
    await r.clone().avif({ quality: 52, effort: 6 }).toFile(join(OUT, `${name}-${w}.avif`));
    await r.clone().webp({ quality: 74 }).toFile(join(OUT, `${name}-${w}.webp`));
    if (fallback === 'png') await r.clone().png({ compressionLevel: 9, palette: true }).toFile(join(OUT, `${name}-${w}.png`));
    else await r.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(join(OUT, `${name}-${w}.jpg`));
  }
  manifest[name] = { w: width, h: height, widths, fallback };
  console.log(name, width, 'x', height, widths.join(','));
}

for (const f of (await readdir(photoDir)).sort()) {
  if (!/\.(jpe?g|png)$/i.test(f) || SKIP.has(parse(f).name)) continue;
  await make(join(photoDir, f), parse(f).name);
}
for (const n of VITALS) await make(join(vitalsDir, `${n}.png`), `vitals-${n.replace(/_/g, '-')}`, { fallback: 'png' });
await writeFile('src/_data/images.json', JSON.stringify(manifest, null, 1));
