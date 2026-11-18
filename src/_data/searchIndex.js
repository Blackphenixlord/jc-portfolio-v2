/* What the Ctrl+K search can find. Built from the same data as the pages. */
import site from './site.js';
import projects from './projects.js';
import experience from './experience.js';

export default [
  { t: 'Home', g: 'Page', href: '/' },
  ...site.nav.map((n) => ({ t: n.label, g: 'Page', href: n.href })),
  ...projects.map((p) => ({
    t: p.title,
    g: p.sheet ? `Case study, ${p.org}` : p.org,
    href: `/work/${p.slug}/`,
    k: [p.subtitle, p.role, ...(p.stack || [])].filter(Boolean).join(' '),
  })),
  ...experience.map((e) => ({ t: e.name, g: 'Experience', href: `/experience/${e.slug}/`, k: e.role })),
  { t: 'Print the résumé', g: 'Action', act: 'print-resume' },
  { t: 'Copy my email address', g: 'Action', act: 'copy-email' },
  { t: 'Switch theme (system, light, dark)', g: 'Setting', act: 'theme' },
  { t: 'Dyslexia mode', g: 'Setting', act: 'dys', k: 'OpenDyslexic wider spacing font' },
  { t: 'GitHub', g: 'Link', href: site.github, ext: true },
  { t: 'LinkedIn', g: 'Link', href: site.linkedin, ext: true },
];
