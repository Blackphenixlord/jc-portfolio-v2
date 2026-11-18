/* Structured data for each project page: the project, a breadcrumb, and the
   person who made it. */
import site from '../_data/site.js';
import { person } from '../_lib/ld.js';

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const p = data.p;
      if (!p) return undefined;
      const url = `${site.url}/work/${p.slug}/`;
      const project = {
        '@type': 'CreativeWork',
        '@id': `${url}#project`,
        name: p.subtitle ? `${p.title}: ${p.subtitle}` : p.title,
        description: p.summary,
        url,
        creator: { '@id': person['@id'] },
        keywords: (p.stack || []).join(', '),
        temporalCoverage: p.years.replace(/\s*–\s*/, '/'),
        sourceOrganization: { '@type': 'Organization', name: p.org },
        creativeWorkStatus: p.status,
      };
      const repo = (p.links || []).find((l) => l.href.startsWith('https://github.com/'));
      if (repo) {
        Object.assign(project, { '@type': ['CreativeWork', 'SoftwareSourceCode'], codeRepository: repo.href });
      }
      return {
        '@context': 'https://schema.org',
        '@graph': [
          project,
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
              { '@type': 'ListItem', position: 2, name: 'Work', item: `${site.url}/work/` },
              { '@type': 'ListItem', position: 3, name: p.title, item: url },
            ],
          },
          person,
        ],
      };
    },
  },
};
