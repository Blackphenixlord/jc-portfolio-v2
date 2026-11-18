/* Structured data for every page: who this site is about. Pages add their
   own on top (a project, a breadcrumb). */
import site from '../_data/site.js';

export const person = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  alternateName: site.formalName,
  url: `${site.url}/`,
  email: `mailto:${site.email}`,
  image: `${site.url}/img/nasa-960.jpg`,
  jobTitle: 'Dual enrollment student and software developer',
  description:
    'Dual enrollment student at UTRGV through the Science Academy in South Texas. NASA HUNCH Houston finalist and team lead on VITALS.',
  homeLocation: { '@type': 'Place', name: 'South Texas' },
  affiliation: [
    { '@type': 'CollegeOrUniversity', name: 'University of Texas Rio Grande Valley' },
    { '@type': 'HighSchool', name: 'Science Academy (South Texas ISD)' },
  ],
  knowsAbout: ['Software engineering', 'AI', 'Automation', 'Security', 'Full-stack development', 'VR development'],
  knowsLanguage: ['English', 'Spanish'],
  sameAs: [site.github, site.linkedin],
};

export default {
  '@context': 'https://schema.org',
  '@graph': [
    person,
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: 'en',
      publisher: { '@id': `${site.url}/#person` },
    },
  ],
};
