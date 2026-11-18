/* Build: src/ in, _site/ out. Plain HTML from Nunjucks templates; one CSS
   file and one small JS file, copied as they are. The HTML base plugin adds
   the /jc-portfolio-v2/ prefix to every root-relative URL for GitHub Pages. */
import { EleventyHtmlBasePlugin } from '@11ty/eleventy';
import images from './src/_data/images.json' with { type: 'json' };

const PREFIX = process.env.PATH_PREFIX ?? '/jc-portfolio-v2/';

export default function (config) {
  config.addPlugin(EleventyHtmlBasePlugin);
  ['img', 'fonts', 'files', 'assets', 'favicon.svg', '.nojekyll'].forEach((p) =>
    config.addPassthroughCopy(`src/${p}`)
  );

  config.addFilter('jsonld', (v) => JSON.stringify(v).replace(/</g, '\\u003c'));
  config.addFilter('bySlug', (list, slug) => list.find((p) => p.slug === slug));
  config.addFilter('isoDate', (d) => new Date(d).toISOString().slice(0, 10));
  /* Meta descriptions: cut at a word boundary under 160 characters. */
  config.addFilter('clip', (s, n = 158) => {
    s = String(s);
    if (s.length <= n) return s;
    const cut = s.slice(0, n - 1);
    return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,:;.]$/, '') + '…';
  });
  config.addFilter('abs', (path, base) => base.replace(/\/$/, '') + path);

  /* <picture> for a processed photo. `sizes` says how wide it renders. */
  config.addShortcode('pic', (name, alt, sizes = '100vw', opts = {}) => {
    const m = images[name];
    if (!m) throw new Error(`No image named ${name}. Run tools/build-images.mjs.`);
    const set = (ext) => m.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
    const largest = m.widths.at(-1);
    const fallbackW = m.widths.find((w) => w >= 960) ?? largest;
    const h = Math.round((m.h / m.w) * fallbackW);
    const eager = opts.eager ? ' fetchpriority="high"' : ' loading="lazy"';
    const cls = opts.cls ? ` class="${opts.cls}"` : '';
    const esc = String(alt).replace(/"/g, '&quot;');
    return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img${cls} src="/img/${name}-${fallbackW}.${m.fallback}" srcset="${set(m.fallback)}" sizes="${sizes}" width="${fallbackW}" height="${h}" alt="${esc}" decoding="async"${eager}></picture>`;
  });

  /* Preload the LCP photo in the browser's best format. Written with the
     prefix already applied, since the base plugin skips imagesrcset. */
  config.addShortcode('preloadPic', (name, sizes) => {
    const m = images[name];
    const set = m.widths.map((w) => `${PREFIX}img/${name}-${w}.avif ${w}w`).join(', ');
    return `<link rel="preload" as="image" type="image/avif" imagesrcset="${set}" imagesizes="${sizes}" fetchpriority="high">`;
  });

  return {
    pathPrefix: PREFIX,
    dir: { input: 'src', output: '_site', includes: '_includes', layouts: '_includes/layouts', data: '_data' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
