/* Each program page: a breadcrumb plus the person. */
import site from '../_data/site.js';
import { person } from '../_lib/ld.js';

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const e = data.e;
      if (!e) return undefined;
      const url = `${site.url}/experience/${e.slug}/`;
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
              { '@type': 'ListItem', position: 2, name: 'Experience', item: `${site.url}/experience/` },
              { '@type': 'ListItem', position: 3, name: e.name, item: url },
            ],
          },
          person,
        ],
      };
    },
  },
};
