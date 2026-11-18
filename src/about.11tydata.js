/* The About page is a profile page about Joshua. */
import site from './_data/site.js';
import ld, { person } from './_lib/ld.js';

export default {
  jsonld: {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ProfilePage', '@id': `${site.url}/about/#page`, url: `${site.url}/about/`, name: 'About Joshua Collado', mainEntity: { '@id': person['@id'] } },
      ...ld['@graph'],
    ],
  },
};
